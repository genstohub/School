// hooks/useEditorInteractions.ts
import { useEffect, Dispatch, SetStateAction, RefObject } from "react";

// This matches the state in your main component
type StagedFile = File | null;

export function useEditorInteractions(
  editorRef: RefObject<HTMLDivElement | null>,
  setStagedFiles: Dispatch<SetStateAction<StagedFile[]>>,
) {
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // --- DELETE LOGIC ---
      const deleteBtn = target.closest('[data-action="delete-figure"]');
      if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();

        const wrap = deleteBtn.closest(".figure-wrap");
        const idxAttr = deleteBtn.getAttribute("data-index");

        wrap?.remove();

        if (idxAttr !== null) {
          const idx = parseInt(idxAttr, 10);
          setStagedFiles((prev) => {
            const next = [...prev];
            next[idx] = null;
            return next;
          });
        }
        return;
      }

      // --- DRAG LOGIC ---
      const handle = target.closest('[data-action="drag-handle"]');
      if (handle) {
        e.preventDefault();
        e.stopPropagation();

        const el = handle.closest(".figure-wrap") as HTMLElement;

        if (el.style.position !== "absolute") {
          const rect = el.getBoundingClientRect();
          const pRect = editor.getBoundingClientRect();
          el.style.width = `${rect.width}px`;
          el.style.left = `${rect.left - pRect.left}px`;
          el.style.top = `${rect.top - pRect.top}px`;
          el.style.position = "absolute";
        }

        const startX = e.clientX;
        const startY = e.clientY;
        const initialLeft = parseFloat(el.style.left) || 0;
        const initialTop = parseFloat(el.style.top) || 0;

        const onMove = (moveEvt: MouseEvent) => {
          el.style.left = `${initialLeft + (moveEvt.clientX - startX)}px`;
          el.style.top = `${initialTop + (moveEvt.clientY - startY)}px`;
        };

        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      }
    };

    // Use mousedown with capture: true to bypass contenteditable hijacking
    editor.addEventListener("mousedown", handleDown, { capture: true });

    return () => {
      editor.removeEventListener("mousedown", handleDown, { capture: true });
    };
  }, [editorRef, setStagedFiles]);
}
