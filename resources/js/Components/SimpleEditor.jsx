import { useEffect, useId, useRef } from 'react';

const CKEDITOR_SRC = 'https://cdn.ckeditor.com/4.22.1/full/ckeditor.js';

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            if (window.CKEDITOR || existing.dataset.loaded === 'true') {
                resolve();
                return;
            }
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
                once: true,
            });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            resolve();
        });
        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
        document.body.appendChild(script);
    });
}

function csrfToken() {
    return (
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || ''
    );
}

function uploadUrl() {
    const token = csrfToken();
    const base =
        typeof route === 'function'
            ? route('admin.editor.upload')
            : '/admin/editor/upload';

    return token ? `${base}?_token=${encodeURIComponent(token)}` : base;
}

export default function SimpleEditor({
    id,
    value = '',
    onChange,
}) {
    const autoId = useId().replace(/:/g, '');
    const editorId = id || `ckeditor-${autoId}`;
    const textareaRef = useRef(null);
    const onChangeRef = useRef(onChange);
    const instanceNameRef = useRef(null);

    onChangeRef.current = onChange;

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            await loadScript(CKEDITOR_SRC);

            if (cancelled || !textareaRef.current || !window.CKEDITOR) {
                return;
            }

            window.CKEDITOR.config.versionCheck = false;

            if (!window.__asCkEditorCssAdded) {
                window.CKEDITOR.addCss(`
                    body {
                        font-family: "Space Grotesk", Arial, Helvetica, sans-serif;
                        font-size: 15px;
                        line-height: 1.65;
                        color: #131313;
                        background: #fff;
                        margin: 16px;
                    }
                    img { max-width: 100%; height: auto; }
                    table { width: 100%; border-collapse: collapse; }
                    table td, table th { border: 1px solid #ccc; padding: 6px 10px; }
                    blockquote {
                        border-left: 4px solid #ff6b9d;
                        margin: 1em 0;
                        padding-left: 1rem;
                        color: rgba(0, 0, 0, 0.7);
                    }
                `);
                window.__asCkEditorCssAdded = true;
            }

            if (window.CKEDITOR.instances[editorId]) {
                window.CKEDITOR.instances[editorId].destroy(true);
            }

            const endpoint = uploadUrl();
            const token = csrfToken();

            const editor = window.CKEDITOR.replace(textareaRef.current, {
                height: 360,
                allowedContent: true,
                extraAllowedContent: '*(*);*{*}',
                versionCheck: false,
                removePlugins: 'exportpdf',
                toolbarCanCollapse: false,
                entities: false,
                basicEntities: true,
                fillEmptyBlocks: false,
                forcePasteAsPlainText: false,
                pasteFromWordRemoveFontStyles: false,
                pasteFromWordRemoveStyles: false,
                filebrowserUploadUrl: endpoint,
                filebrowserImageUploadUrl: endpoint,
                filebrowserUploadMethod: 'form',
                uploadUrl: endpoint,
                fileTools_requestHeaders: token
                    ? {
                          'X-CSRF-TOKEN': token,
                          'X-Requested-With': 'XMLHttpRequest',
                      }
                    : {
                          'X-Requested-With': 'XMLHttpRequest',
                      },
            });

            instanceNameRef.current = editor.name;

            editor.on('instanceReady', () => {
                if (cancelled) {
                    return;
                }
                editor.setData(value || '');
            });

            editor.on('change', () => {
                onChangeRef.current?.(editor.getData());
            });

            editor.on('blur', () => {
                onChangeRef.current?.(editor.getData());
            });
        };

        init().catch(() => {
            // Keep textarea usable if CDN fails.
        });

        return () => {
            cancelled = true;
            const name = instanceNameRef.current || editorId;
            if (window.CKEDITOR?.instances?.[name]) {
                window.CKEDITOR.instances[name].destroy(true);
            }
            instanceNameRef.current = null;
        };
        // Mount once; parent forms own the value thereafter.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorId]);

    return (
        <textarea
            id={editorId}
            ref={textareaRef}
            defaultValue={value}
            className="block min-h-[220px] w-full rounded-2xl border border-black/10 bg-white p-4 text-[15px]"
        />
    );
}
