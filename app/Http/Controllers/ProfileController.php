<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Update the currently authenticated user data in the storage.
     */
    public function update(Request $request)
    {
        $attributes = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignoreModel(auth()->user())],
        ]);

        auth()->user()->update($attributes);

        return response()->json([
            'message' => 'Your profile was updated successfully!',
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password'     => ['required', 'current_password'],
            'new_password' => ['required', 'min:6', 'max:255', 'confirmed'],
        ]);

        auth()->user()->update([
            'password' => bcrypt($request->new_password)
        ]);


        return response()->json([
            'message' => 'Your password was updated successfully!',
        ]);
    }
}
