import { Suspense } from 'react';
import LoginPageClient from './LoginPageClient';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading login…
        </div>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
