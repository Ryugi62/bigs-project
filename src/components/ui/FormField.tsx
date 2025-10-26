import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

type FormFieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#10234b]">
        {label}
        {required && <span className="ml-1 text-[#ea3d4b]">*</span>}
      </label>
      {children}
      {(hint || error) && (
        <p className={cx('text-sm', error ? 'text-[#ea3d4b]' : 'text-[#6f7ca2]')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
