import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/60 p-4 sm:items-center sm:justify-center">
      <div className="w-full max-w-lg rounded-lg bg-paper p-5 shadow-lift">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="닫기">
            <X aria-hidden className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

