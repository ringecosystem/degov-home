import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'lg' | 'default' | 'sm';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-blue text-bg-primary hover:bg-brand-blue/85',
  secondary: 'border border-white/15 text-text-primary hover:border-white/30',
  ghost: 'text-text-primary hover:bg-white/5'
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'px-8 py-3 text-lg',
  default: 'px-6 py-2.5 text-base',
  sm: 'px-4 py-2 text-sm'
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', arrow = false, className, children, ...props }, ref) => {
    const classes = cn(
      'group inline-flex items-center justify-center gap-2 rounded-full font-medium',
      'transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const arrowEl = arrow ? (
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    ) : null;

    if ('href' in props && props.href) {
      const { href, ...anchorProps } = props as ButtonAsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
          {arrowEl}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {children}
        {arrowEl}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
