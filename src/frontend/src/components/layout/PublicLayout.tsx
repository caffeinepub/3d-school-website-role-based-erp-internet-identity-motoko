import { Outlet } from '@tanstack/react-router';
import PublicNav from './PublicNav';
import PublicFooter from './PublicFooter';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
