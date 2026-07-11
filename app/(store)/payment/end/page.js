'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/checkout');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#ff3f6c] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
