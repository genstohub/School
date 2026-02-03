import { useState, useEffect, useCallback } from "react";
import { set, del } from "idb-keyval";
import { StagedFiles } from "../utils/editor-helpers";

export function useAutoSave(
  editorRef: React.RefObject<HTMLDivElement | null>,
  stagedFiles: StagedFiles,
  topic: string,
  courseCode: string,
) {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const saveDraft = useCallback(async () => {
    if (!editorRef.current) return;
    const draftObject = {
      html: editorRef.current.innerHTML,
      topic: topic,
      courseCode: courseCode,
      stagedFiles: stagedFiles,
    };
    try {
      await set(courseCode, {...draftObject});
      // await set('draft_html', editorRef.current.innerHTML);
      // await set('draft_topic', topic);
      // await set('draft_files', stagedFiles);
      setLastSaved(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch (err) {
      console.error("Auto-save failed", err);
    }
  }, [stagedFiles, topic, editorRef, courseCode]);

  useEffect(() => {
    const interval = setInterval(saveDraft, 15000); // 15s interval
    return () => clearInterval(interval);
  }, [saveDraft]);

  const clearDraft = async () => {
    await Promise.all([
      del(courseCode),
      // , del('draft_topic'), del('draft_files')
    ]);
    setLastSaved(null);
  };

  return { lastSaved, clearDraft, saveNow: saveDraft };
}
