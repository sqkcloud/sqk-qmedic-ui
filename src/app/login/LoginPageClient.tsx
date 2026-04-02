'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const nextUrl = useMemo(() => searchParams.get('next') || '/inbox', [searchParams]);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    });

    if (!response.ok) {
      setError('Login failed. Please check your user ID and password.');
      return;
    }

    window.location.href = nextUrl;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1d3557,_#0f172a_55%)] px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur">
        <h1 className="mb-2 text-3xl font-semibold">Sign In</h1>
        <p className="mb-6 text-sm text-white/60">Enter your credentials to continue.</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm text-white/70">User ID</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
