<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
   public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // TAMBAHKAN BAGIAN INI AGAR NOTIFIKASI MUNCUL DI REACT
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            // Data navigasi dinamis dari database (otomatis terupdate ketika admin input)
            'navEvents' => function () {
                try {
                    return \App\Models\Event::whereIn('type', ['event', 'Event'])
                        ->where(function ($q) {
                            $q->where('is_active', true)->orWhere('is_active', 1);
                        })
                        ->select('id', 'title', 'slug', 'created_at')
                        ->latest()
                        ->get();
                } catch (\Throwable $e) {
                    return [];
                }
            },
            'navPrograms' => function () {
                try {
                    return \App\Models\Event::whereIn('type', ['program', 'Program'])
                        ->where(function ($q) {
                            $q->where('is_active', true)->orWhere('is_active', 1);
                        })
                        ->select('id', 'title', 'slug', 'created_at')
                        ->latest()
                        ->get();
                } catch (\Throwable $e) {
                    return [];
                }
            },
        ];
    }
}
