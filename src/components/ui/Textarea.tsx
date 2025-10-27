import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

const baseStyles =
  'w-full rounded-xl border border-transparent bg-white/60 px-4 py-3 text-base text-[#10234b] shadow-[0_12px_32px_rgba(15,42,95,0.05)] placeholder:text-[#6f7ca2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    const ariaInvalid = props['aria-invalid'];
    const invalid =
      Boolean(hasError) || ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '';

    return (
      <textarea
        ref={ref}
        className={cx(
          baseStyles,
          'min-h-[180px] resize-y',
          invalid && 'border-[#ea3d4b] focus-visible:outline-[#ea3d4b] text-[#ea3d4b]',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
