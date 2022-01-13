<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $media = $request->user()->media()->paginate(12);
        $media->getCollection()->transform(function ($file) {
            $file->url = asset("storage/{$file->path}");
            return $file;
        });
        return $media;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $path = $request->file('file')->store("media/{$request->user()->id}", 'public');

        $media = Media::create([
            'user_id' => $request->user()->id,
            'path'    => $path,
        ]);

        return response()->json([
            'success'    => true,
            'dowloadUrl' => asset("storage/$path"),
            'media_id'   => $media,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $media)
    {
        $image = Media::where('user_id', $request->user()->id)->findOrFail($media);
        $image->url = asset("storage/{$image->path}");
        return $image;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, Media $media)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $media)
    {
        $image = Media::where('user_id', $request->user()->id)->findOrFail($media);
        $image->delete();
    }
}
