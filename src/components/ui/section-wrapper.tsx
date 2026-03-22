import { cn } from '@/lib/utils';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  paddings?: string;
  children: React.ReactNode;
}

function SectionWrapper({
  paddings = 'py-[110px] lg:py-[140px]',
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn(paddings, className)} {...props}>
      <div className="container">{children}</div>
    </section>
  );
}

export { SectionWrapper };
export type { SectionWrapperProps };
