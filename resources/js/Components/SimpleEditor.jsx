import { useEffect, useRef } from 'react';

const JQUERY_SRC = 'https://code.jquery.com/jquery-3.7.1.min.js';
const SUMMERNOTE_CSS =
    'https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css';
const SUMMERNOTE_SRC =
    'https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js';

function loadStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            if (existing.dataset.loaded === 'true') {
                resolve();
                return;
            }
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            resolve();
        });
        script.addEventListener('error', reject);
        document.body.appendChild(script);
    });
}

export default function SimpleEditor({
    id = 'description',
    value = '',
    onChange,
}) {
    const textareaRef = useRef(null);
    const onChangeRef = useRef(onChange);
    const initializedRef = useRef(false);

    onChangeRef.current = onChange;

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            loadStylesheet(SUMMERNOTE_CSS);
            await loadScript(JQUERY_SRC);
            await loadScript(SUMMERNOTE_SRC);

            if (cancelled || !textareaRef.current || !window.jQuery?.fn?.summernote) {
                return;
            }

            const $el = window.jQuery(textareaRef.current);

            $el.summernote({
                placeholder: 'Write page content…',
                height: 320,
                disableDragAndDrop: true,
                styleTags: ['p', 'h2', 'h3'],
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link']],
                    ['view', ['codeview']],
                ],
                callbacks: {
                    onChange(contents) {
                        onChangeRef.current?.(contents);
                    },
                },
            });

            $el.summernote('code', value || '');
            initializedRef.current = true;
        };

        init();

        return () => {
            cancelled = true;
            if (
                textareaRef.current &&
                initializedRef.current &&
                window.jQuery?.fn?.summernote
            ) {
                window.jQuery(textareaRef.current).summernote('destroy');
                initializedRef.current = false;
            }
        };
        // Initialize once per mount; value is applied inside init.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <textarea
            id={id}
            ref={textareaRef}
            defaultValue={value}
            className="block w-full"
        />
    );
}
