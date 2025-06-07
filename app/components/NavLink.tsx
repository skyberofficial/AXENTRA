'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="relative flex items-center gap-2">
      <div 
        className={`w-1.5 h-1.5 rounded-full bg-[#aef56a] transition-all duration-300 ease-in-out ${
          isActive 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-0'
        }`} 
      />
      <Link 
        href={href} 
        className={`text-sm text-white/80 hover:text-white transition-colors relative z-10 ${
          isActive ? 'text-white' : ''
        }`}
      >
        {children}
      </Link>
    </div>
  );
} 