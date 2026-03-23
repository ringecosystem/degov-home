import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn('text-sm font-medium tracking-widest text-text-secondary uppercase', className)}>
      {children}
    </p>
  );
}
