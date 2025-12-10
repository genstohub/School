import * as React from "react";

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return (
    <div className="dialog">
      {children}
    </div>
  );
}

export function DialogContent({ children }: DialogProps) {
  return <div className="dialog-content">{children}</div>;
}

export function DialogHeader({ children }: DialogProps) {
  return <div className="dialog-header">{children}</div>;
}

export function DialogTitle({ children }: DialogProps) {
  return <h2 className="dialog-title">{children}</h2>;
}
