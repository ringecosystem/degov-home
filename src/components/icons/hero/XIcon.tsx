import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

export function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
      aria-hidden
      {...props}
    >
      <path
        d="M12.8109 8.46961L20.2576 0H18.4936L12.0249 7.35254L6.86225 0H0.90625L8.71492 11.1194L0.90625 20H2.67025L9.49692 12.2338L14.9503 20H20.9063M3.30692 1.30158H6.01692L18.4923 18.7624H15.7816"
        fill="currentColor"
      />
    </svg>
  );
}
