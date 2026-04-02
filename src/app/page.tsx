import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const cookieStore = await cookies();
  const hasSession = cookieStore.get('sqk_session')?.value === '1';
  redirect(hasSession ? '/inbox' : '/login');
}
