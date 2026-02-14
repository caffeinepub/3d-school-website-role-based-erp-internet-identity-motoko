import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/queries/useCallerProfile';
import { SchoolLogo } from '../brand/SchoolLogo';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Calendar,
  GraduationCap,
  DollarSign,
  Bell,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import ProfileSetupModal from '../auth/ProfileSetupModal';

export default function ErpLayout() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/erp/login' });
  };

  const navItems = [
    { to: '/erp', label: 'Dashboard', icon: LayoutDashboard, roles: ['all'] },
    { to: '/erp/students', label: 'Students', icon: Users, roles: ['admin', 'principal', 'teacher'] },
    { to: '/erp/attendance', label: 'Attendance', icon: Calendar, roles: ['all'] },
    { to: '/erp/grades', label: 'Grades', icon: GraduationCap, roles: ['all'] },
    { to: '/erp/staff', label: 'Staff', icon: Users, roles: ['admin', 'principal'] },
    { to: '/erp/timetable', label: 'My Timetable', icon: Calendar, roles: ['teacher', 'student'] },
    { to: '/erp/academics/sections', label: 'Classes', icon: GraduationCap, roles: ['admin', 'principal'] },
    { to: '/erp/academics/assignments', label: 'Assignments', icon: BookOpen, roles: ['teacher', 'student'] },
    { to: '/erp/fees', label: 'Fees', icon: DollarSign, roles: ['all'] },
    { to: '/erp/announcements', label: 'Announcements', icon: Bell, roles: ['all'] },
    { to: '/erp/library', label: 'Library', icon: BookOpen, roles: ['all'] },
    { to: '/erp/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'principal', 'accountant', 'teacher'] },
    { to: '/erp/admin/roles', label: 'Role Management', icon: Settings, roles: ['admin'] },
  ];

  const userRoles = userProfile?.erpRoles || [];
  const isAdmin = userRoles.includes('admin' as any);

  const filteredNavItems = navItems.filter((item) => {
    if (item.roles.includes('all')) return true;
    if (isAdmin) return true;
    return item.roles.some((role) => userRoles.includes(role as any));
  });

  return (
    <>
      {showProfileSetup && <ProfileSetupModal />}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-sidebar transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            <SchoolLogo className="text-sidebar-foreground" />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <div className="mb-2 text-sm text-sidebar-foreground">
              <p className="font-medium">{userProfile?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">
                {userRoles.map((r) => String(r)).join(', ') || 'No roles'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex-1" />
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
