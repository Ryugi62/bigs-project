'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    const mod = await import('react-quill');
    return mod.default;
  },
  { ssr: false },
);

export type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  id,
}: RichTextEditorProps) {
  const modules = useMemo<ReactQuillProps['modules']>(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'blockquote', 'code-block'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'align',
      'link',
      'blockquote',
      'code-block',
    ],
    [],
  );

  return (
    <div className={className} id={id}>
      <ReactQuill
        className="rounded-3xl border border-[#e2e8f5] bg-white/80 text-[#1c2b65]"
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
