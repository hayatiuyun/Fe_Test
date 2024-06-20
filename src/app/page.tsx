// app/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RootPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/sign-in');
    return null;
  }

  router.push('/dashboard'); // Redirect to dashboard if authenticated

  return null;
};

export default RootPage;
