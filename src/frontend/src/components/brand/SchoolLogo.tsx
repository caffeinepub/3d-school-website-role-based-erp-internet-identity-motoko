import { Link } from '@tanstack/react-router';

export function SchoolLogo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/assets/generated/school-logo.dim_512x512.png"
        alt="School Logo"
        className="h-10 w-10 object-contain"
      />
      <span className="text-xl font-bold">Excellence Academy</span>
    </Link>
  );
}
