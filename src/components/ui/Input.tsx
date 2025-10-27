import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const baseStyles =
  'w-full rounded-xl border border-transparent bg-white/60 px-4 py-3 text-base text-[#10234b] shadow-[0_12px_32px_rgba(15,42,95,0.05)] placeholder:text-[#6f7ca2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    const ariaInvalid = props['aria-invalid'];
    const invalid =
      Boolean(hasError) ||
      ariaInvalid === true ||
      ariaInvalid === 'true' ||
      ariaInvalid === 'grammar' ||
      ariaInvalid === 'spelling';

    return (
      <input
        ref={ref}
        className={cx(
          baseStyles,
          invalid && 'border-[#ea3d4b] focus-visible:outline-[#ea3d4b] text-[#ea3d4b]',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
