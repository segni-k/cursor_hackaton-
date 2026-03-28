<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocaleController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'locale' => 'required|in:en,am',
        ]);

        if ($request->user()) {
            $request->user()->update(['locale' => $validated['locale']]);
        }

        $request->session()->put('locale', $validated['locale']);

        return back()->with('success', __('messages.locale_updated'));
    }
}
