import { useEffect } from 'react';
import { useRouter } from 'next/router';

const publicPaths = ['/login']; // 不需要登录就能访问的路径

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isPublicPath = publicPaths.includes(router.pathname);

    if (!isAuthenticated && !isPublicPath) {
      router.push('/login');
    }
  }, [router.pathname]);

  return <>{children}</>;
} 