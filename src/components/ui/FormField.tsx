import { cloneElement, isValidElement } from 'react';
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
  const message = error ?? hint;
  const messageId = message ? `${htmlFor}-${error ? 'error' : 'hint'}` : undefined;
  let childWithAccessibility = children;
  if (isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    childWithAccessibility = cloneElement(children, {
      ...(messageId && !childProps['aria-describedby'] ? { 'aria-describedby': messageId } : {}),
      ...(error && childProps['aria-invalid'] === undefined ? { 'aria-invalid': true } : {}),
      ...(error && 'hasError' in childProps ? { hasError: true } : {}),
    });
  }

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#10234b]">
        {label}
        {required && <span className="ml-1 text-[#ea3d4b]">*</span>}
      </label>
      {childWithAccessibility}
      {message && (
        <p id={messageId} className={cx('text-sm', error ? 'text-[#ea3d4b]' : 'text-[#6f7ca2]')}>
          {message}
        </p>
      )}
    </div>
  );
}
