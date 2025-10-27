import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

const baseStyles =
  'w-full appearance-none rounded-xl border border-transparent bg-white/60 px-4 py-3 text-base text-[#10234b] shadow-[0_12px_32px_rgba(15,42,95,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, ...props }, ref) => {
    const ariaInvalid = props['aria-invalid'];
    const invalid =
      Boolean(hasError) ||
      ariaInvalid === true ||
      ariaInvalid === 'true' ||
      ariaInvalid === 'grammar' ||
      ariaInvalid === 'spelling';

    return (
      <select
        ref={ref}
        className={cx(
          baseStyles,
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%2310234b'%3E%3Cpath d='M8.47 10.028a.75.75 0 0 1 1.06-.058l2.47 2.18 2.47-2.18a.75.75 0 1 1 1 1.118l-3 2.647a.75.75 0 0 1-1 0l-3-2.647a.75.75 0 0 1-.058-1.06Z'/%3E%3C/svg%3E\")] bg-no-repeat bg-[length:24px_24px] bg-[position:calc(100%-1rem)_50%] pr-10",
          invalid &&
            'border-[#ea3d4b] focus-visible:outline-[#ea3d4b] text-[#ea3d4b] bg-[position:calc(100%-1rem)_50%]',
          className,
        )}
        {...props}
      />
    );
  },
);

Select.displayName = 'Select';
