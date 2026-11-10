<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class EditorUploadController extends Controller
{
    public function store(Request $request): JsonResponse|Response
    {
        $request->validate([
            'upload' => ['required', 'file', 'max:10240', 'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml'],
        ]);

        $file = $request->file('upload');
        $path = $file->store('editor', 'public');
        $url = Storage::disk('public')->url($path);

        if (! str_starts_with($url, 'http') && ! str_starts_with($url, '/')) {
            $url = '/'.$url;
        }

        // Normalize to site-relative /storage/... for consistent frontend rendering.
        if (str_contains($url, '/storage/')) {
            $url = '/storage/'.ltrim(str_replace('\\', '/', explode('/storage/', $url, 2)[1] ?? $path), '/');
        } else {
            $url = '/storage/'.$path;
        }

        $funcNum = $request->input('CKEditorFuncNum');

        if ($funcNum !== null && $funcNum !== '') {
            $safeUrl = json_encode($url, JSON_UNESCAPED_SLASHES);
            $safeFunc = preg_replace('/[^0-9]/', '', (string) $funcNum);

            return response(
                '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$safeFunc.', '.$safeUrl.');</script>',
                200,
                ['Content-Type' => 'text/html; charset=UTF-8'],
            );
        }

        return response()->json([
            'uploaded' => 1,
            'fileName' => $file->getClientOriginalName(),
            'url' => $url,
        ]);
    }
}
