import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const baseStyles =
  'cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1c2b65] text-white shadow-[0_8px_24px_rgba(10,24,68,0.25)] hover:bg-[#162152] focus-visible:outline-[#1c2b65]',
  secondary:
    'bg-white text-[#1c2b65] border border-[#1c2b65] hover:bg-[#f5f7ff] focus-visible:outline-[#1c2b65]',
  ghost:
    'bg-transparent text-[#1c2b65] hover:bg-white/70 border border-transparent focus-visible:outline-[#1c2b65]',
};

export function buttonClasses({
  variant = 'primary',
  fullWidth,
  className,
}: {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cx(baseStyles, variantStyles[variant], fullWidth && 'w-full', className);
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', variant = 'primary', fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, fullWidth, className })}
      {...props}
    />
  ),
);

Button.displayName = 'Button';

export default Button;
