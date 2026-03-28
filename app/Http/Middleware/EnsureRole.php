<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user || !$user->role) {
            abort(403, 'Unauthorized.');
        }

        if (!in_array($user->role->slug, $roles)) {
            abort(403, 'Unauthorized. Insufficient role.');
        }

        return $next($request);
    }
}
