"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Italic,
  Underline,
  List,
  ListOrdered,
  Omega,
  Palette,
  Type,
  Eraser,
  Highlighter,
  PaintBucket,
  StickyNote,
  Quote,
  X,
  ChevronDown,
  Type as FontIcon,
  Pilcrow,
  Upload,
  FileImage,
  SendIcon,
  FileText,
  CloudIcon,
  Check,
} from "lucide-react";
import { useParams } from "next/navigation";
import { set, get } from "idb-keyval";
import {
  rehydrateImages,
  sanitizeEditorHTML,
  StagedFiles,
} from "./utils/editor-helpers";
import { useAutoSave } from "./hooks/useAutoSave";
import DraftModal from "../../Components/DraftModal";
import { useEditorInteractions } from "./hooks/useEditorInteractions";
import { REST_API } from "@/constants";
import { useUser } from "@/hooks";

// --- CONSTANTS ---
const SYMBOL_GROUPS = {
  // Math: ["π", "∞", "Σ", "√", "Δ", "±", "≈", "≠", "≤", "≥", "∫", "∂"],
  Greek: ["μ", "θ", "Ω", "α", "β", "γ", "λ", "φ", "ε", "δ", "ψ"],
  Publishing: ["™", "©", "®", "§", "†", "•", "→", "⇒", "↔", "¶"],
  Calculus: [
    "∫",
    "∬",
    "∭",
    "∮",
    "∇",
    "∂",
    "dx",
    "dy",
    "dt",
    "∆",
    "ε",
    "δ",
    "lim",
    "→",
    "∞",
    "f'",
    "f''",
  ],
  Math: [
    "π",
    "Σ",
    "√",
    "≈",
    "≠",
    "±",
    "≤",
    "≥",
    "Δ",
    "∏",
    "θ",
    "ω",
    "τ",
    "∠",
    "∝",
    "≡",
  ],
  Science: [
    "α",
    "β",
    "γ",
    "λ",
    "μ",
    "Ω",
    "℃",
    "℉",
    "⇌",
    "ΔH",
    "ρ",
    "ψ",
    "κ",
    "Å",
    "ν",
    "σ",
    "ζ",
    "χ",
  ],
  Stats: [
    "μ",
    "σ",
    "ρ",
    "χ²",
    "n!",
    "P(A)",
    "x̄",
    "ŷ",
    "∈",
    "⊂",
    "∀",
    "∃",
    "∩",
    "∪",
    "¬",
    "∧",
    "∨",
    "⊕",
    "⇒",
    "⇔",
  ],
  Operators: [
    "+",
    "-",
    "=",
    "×",
    "÷",
    "/",
    "_",
    "^",
    "{",
    "}",
    "[",
    "]",
    "|",
    "~",
    "¬",
    "±",
    "∓",
    "∗",
    "∘",
    "∙",
    ">",
    "<",
  ],
  General: [
    "©",
    "®",
    "™",
    "•",
    "§",
    "†",
    "‡",
    "¶",
    "«",
    "»",
    "“",
    "”",
    "‘",
    "’",
  ],
};

const COLOR_PALETTE = [
  { name: "Reset", hex: "transparent" },
  { name: "Dark", hex: "#0f172a" },
  { name: "Crimson", hex: "#be123c" },
  { name: "Azure", hex: "#1d4ed8" },
  { name: "Emerald", hex: "#047857" },
  { name: "Gold", hex: "#eab308" },
  { name: "Plum", hex: "#7e22ce" },
  { name: "Paper", hex: "#ffffff" },
];

export default function OmniMaterialEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User hook
  const { user } = useUser();

  // Params
  const { courseId } = useParams();
  const courseCode = courseId?.toString().toUpperCase() || "";

  // State
  const [topic, setTopic] = useState("Research Manuscript V1");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [font, setFont] = useState("font-serif");
  const [theme, setTheme] = useState("bg-white");
  const [showImageModal, setShowImageModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState<boolean>(false);

  // This stores the actual binary files to be sent to server
  const [stagedFiles, setStagedFiles] = useState<(File | null)[]>([]); // Tell TypeScript this is an array that contains either Files or nulls

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState("Compiling...");
  // phases: 'loading' | 'success' | 'error'
  const [publishPhase, setPublishPhase] = useState<
    "loading" | "success" | "error"
  >("loading");

  // All that complex drag/delete logic is now just one line!
  useEditorInteractions(editorRef, setStagedFiles);

  // --- CORE EXECUTION ---
  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    setActiveMenu(null);
  };

  // Declaring a useAutoSave hook to save the work
  const { saveNow, lastSaved, clearDraft } = useAutoSave(
    editorRef,
    stagedFiles,
    topic,
    courseCode,
  );

  // Check for draft specific to THIS course on mount
  useEffect(() => {
    const checkDraft = async () => {
      // Look for the key tied to this specific courseCode
      const draft = await get<{
        html: string;
        topic: string;
        courseCode: string;
        stagedFiles: StagedFiles;
      }>(courseCode);

      const draftedHtml = draft?.html;

      if (draftedHtml && draftedHtml.length > 50) {
        setShowDraftModal(true);
      }
    };
    checkDraft();
  }, [courseCode]); // Re-run if the user switches courses

  // The Restore Function
  const handleDraftRestore = async () => {
    const draft = await get(courseCode);
    if (!draft || !editorRef.current) return;

    const editor = editorRef.current;

    // Force a "Reset" of the editor's internal engine
    editor.blur();
    editor.innerHTML = "";

    //  Sync React State
    setTopic(draft.topic || "");
    setStagedFiles(draft.stagedFiles || []);

    //Inject the HTML
    const cleanHtml = sanitizeEditorHTML(draft.html);
    editor.innerHTML = cleanHtml;

    //  THE RE-IGNITION (Crucial for interaction)
    // We wait for two frames to ensure React and the DOM are in sync
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Fix the image blobs
        rehydrateImages(editor, draft.stagedFiles);

        // Force the browser to 'realize' these are real elements
        const images = editor.querySelectorAll("img");
        images.forEach((img) => {
          void img.offsetHeight; // The 'void' fix for your ESLint error
        });

        // Place cursor at the start so the editor is 'active'
        editor.focus();
      });
    });

    setShowDraftModal(false);
  };

  const handleDraftDiscard = async () => {
    //  Reset the editor UI if you want them to start a new one
    setTopic("New Research Manuscript");
    if (editorRef.current)
      editorRef.current.innerHTML = "<h1>New Manuscript</h1>";
    setStagedFiles([]);
    setShowDraftModal(false);
  };

  // --- RESCUE FEATURES ---
  const forceParagraph = () => exec("formatBlock", "p");

  const powerReset = () => {
    exec("removeFormat");
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;
    let node: Node | null = selection.anchorNode;
    while (node && node !== editorRef.current) {
      if (node instanceof HTMLElement) {
        node.removeAttribute("style");
        node.className = "";
      }
      node = node.parentNode;
    }
  };

  const applyBlockFill = (color: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;
    let node: Node | null = selection.anchorNode;
    while (
      node &&
      !["P", "H1", "H2", "H3", "LI", "DIV"].includes(node.nodeName)
    ) {
      node = node.parentNode;
    }
    if (node instanceof HTMLElement && node !== editorRef.current) {
      node.style.backgroundColor = color;
      node.style.padding = color === "transparent" ? "0" : "24px";
      node.style.borderRadius = "8px";
    }
    setActiveMenu(null);
  };

  // --- IMAGE & MODAL LOGIC ---
  const insertImage = (file: File) => {
    // Check if file is > 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("This image is too heavy! Please choose a file smaller than 5MB.");
      return;
    }
    const tempUrl = URL.createObjectURL(file);
    const imageIndex = stagedFiles.length;
    setStagedFiles((prev) => [...prev, file]);

   const html = `
  <div class="figure-wrap" 
      contenteditable="false" 
      data-index="${imageIndex}"
      style="display: inline-block; vertical-align: top; margin: 10px; position: relative; user-select: none; touch-off: none; text-align: center; width: min-content;">
    
    <div class="resize-container" style="position: relative; display: inline-block; resize: both; overflow: hidden; width: 300px; min-width: 100px; min-height: 100px; line-height: 0; background: white; border: 1px solid #e2e8f0; border-radius: 4px; pointer-events: auto !important;">
      
      <div class="drag-overlay" 
          data-action="drag-handle"
          style="position: absolute; inset: 0; cursor: move; z-index: 5; background: rgba(0,0,0,0); 
          clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%);">
      </div>

      <button 
        type="button"
        data-action="delete-figure"
        data-index="${imageIndex}"
        style="position: absolute; top: 5px; right: 5px; z-index: 60; background: #ef4444; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px;">✕</button>

      <img src="${tempUrl}" data-index="${imageIndex}" style="width: 100%; height: 100%; object-fit: fill; pointer-events: none;" />
      
      <div style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: linear-gradient(135deg, transparent 50%, #6366f1 50%); pointer-events: none; z-index: 10;"></div>
    </div>

    <div contenteditable="true" class="figure-caption"
        style="margin-top: 8px; font-style: italic; color: #64748b; font-size: 0.85rem; width: 100%; display: block; text-align: center; line-height: 1.5; outline: none; cursor: text;">
      Enter Figure Caption...
    </div>
  </div>`;

    // This command actually pushes the HTML string into the editor
    exec("insertHTML", html);
    setShowImageModal(false);
  };

  interface RemoveFileEvent extends CustomEvent {
    detail: number; // The index of the file to "null" out
  }

  useEffect(() => {
    const handleRemoveFile = (e: Event) => {
      // Cast the generic Event to our specific RemoveFileEvent
      const customEvent = e as RemoveFileEvent;
      const indexToRemove = customEvent.detail;

      setStagedFiles((prev) => {
        const newFiles = [...prev];
        newFiles[indexToRemove] = null; // Valid now because of our state type
        return newFiles;
      });
    };

    // Use 'window' as the target for our custom communication
    window.addEventListener("removeStagedFile", handleRemoveFile);
    return () =>
      window.removeEventListener("removeStagedFile", handleRemoveFile);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      insertImage(e.dataTransfer.files[0]);
  };

  // --- ANNOTATIONS ---
  const addInnerNote = () => {
    const html = `<div class="inner-note" style="background: #f8fafc; border-left: 8px solid #0f172a; padding: 24px; margin: 24px 0; border-radius: 4px; font-family: sans-serif;"><b style="text-transform: uppercase; font-size: 0.7rem; color: #475569;">Study Note</b><div style="margin-top: 8px;">Key insight here.</div></div><p><br></p>`;
    exec("insertHTML", html);
  };

  const addSideNote = () => {
    const html = `<aside contenteditable="false" style="float: right; width: 220px; margin: 0 -280px 20px 20px; padding: 20px; background: #fffbeb; border-left: 6px solid #d97706; border-radius: 4px; box-shadow: 10px 10px 30px rgba(0,0,0,0.05);"><div contenteditable="true" style="font-size: 0.85rem; font-family: sans-serif; color: #92400e; line-height:5;"><b>MARGINALIA:</b> Add definitions or references.</div></aside>`;
    exec("insertHTML", html);
  };

  const handlePublish = async () => {
    if (!editorRef.current) return;

    setIsPublishing(true);
    setPublishPhase("loading");
    setPublishStatus("Compiling...");

    // Rotate status messages to keep user engaged
    const statusTimers = [
      setTimeout(() => setPublishStatus("Analyzing Assets..."), 1500),
      setTimeout(() => setPublishStatus("Finalizing Metadata..."), 3000),
      setTimeout(
        () => setPublishStatus("Uplinking to Academic Servers..."),
        4500,
      ),
    ];

    try {
      const finalContent = sanitizeEditorHTML(editorRef.current.innerHTML);
      const formData = new FormData();

      await saveNow(); // Sync IndexedDB

      formData.append("topic", topic);
      formData.append("content", finalContent);
      formData.append("courseCode", courseCode.toLowerCase());
      formData.append("user_id", user.user_id);

      stagedFiles.forEach((file, index) => {
        if (file) formData.append(`image_${index}`, file);
      });

      const response = await fetch(
        REST_API + "/courses/materials/new/publish",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      // Clear all simulated timers
      statusTimers.forEach((t) => clearTimeout(t));

      if (response.ok) {
        setPublishPhase("success");
        await clearDraft();

        // Clean up Editor UI
        setTopic("New Topic Manuscript");
        editorRef.current.innerHTML = "<h1>New Manuscript</h1>";
        setStagedFiles([]);
      } else {
        setPublishPhase("error");
      }
    } catch (error) {
      statusTimers.forEach((t) => clearTimeout(t));
      setPublishPhase("error");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-400 text-slate-900 font-sans overflow-hidden">
      {/* FIXED TOOLBAR */}
      <header className="bg-white border-b-2 border-slate-600 shadow-2xl z-[100] shrink-0">
        <div className="flex items-center gap-4 px-6 py-2 bg-slate-50 border-b relative">
          <div className="flex bg-white border rounded shadow-sm flex-wrap">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "font" ? null : "font")
              }
              className="px-3 py-1 text-[10px] font-black uppercase flex items-center gap-2 border-r"
            >
              <FontIcon size={14} /> {font.split("-")[1]}{" "}
              <ChevronDown size={12} />
            </button>
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "theme" ? null : "theme")
              }
              className="px-3 py-1 text-[10px] font-black uppercase flex items-center gap-2"
            >
              <Palette size={14} /> {theme === "bg-white" ? "Plain" : "Book"}{" "}
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex bg-white border rounded p-1 gap-1 relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "fore" ? null : "fore")
              }
              className="p5 hover:bg-slate-100 rounded"
              title="Text Color"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "hilite" ? null : "hilite")
              }
              className="p5 hover:bg-slate-100 rounded text-yellow-500"
              title="Highlight"
            >
              <Highlighter size={18} />
            </button>
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "fill" ? null : "fill")
              }
              className="p5 hover:bg-slate-100 rounded text-indigo-600"
              title="Block Fill"
            >
              <PaintBucket size={18} />
            </button>

            {["fore", "hilite", "fill"].includes(activeMenu || "") && (
              <div className="absolute top-10 left-0 bg-white border-2 border-black shadow-2xl p-3 rounded z-[210] grid grid-cols-4 gap-2">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      if (activeMenu === "fore") exec("foreColor", c.hex);
                      if (activeMenu === "hilite") exec("hiliteColor", c.hex);
                      if (activeMenu === "fill") applyBlockFill(c.hex);
                    }}
                    className="w-8 h-8 border rounded hover:scale-110 transition"
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Menus for Font/Theme */}
          {activeMenu === "font" && (
            <div className="absolute top-12 left-6 bg-white border-2 border-black shadow-xl p-1 rounded w-40 z-[210]">
              {["font-serif", "font-sans", "font-mono"].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFont(f);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-black hover:text-white text-[10px] font-black uppercase"
                >
                  {f.split("-")[1]}
                </button>
              ))}
            </div>
          )}
          {activeMenu === "theme" && (
            <div className="absolute top-12 left-32 bg-white border-2 border-black shadow-xl p-1 rounded w-40 z-[210]">
              {["bg-white", "bg-[#fcf9f2]", "bg-[#f4f1ea]"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-black hover:text-white text-[10px] font-black uppercase"
                >
                  {t.includes("white") ? "Classic" : "Parchment"}
                </button>
              ))}
            </div>
          )}

          <button
            className="ml-auto bg-indigo-700 text-white px-5 py-2 rounded-full font-black text-[10px] tracking-widest flex items-center gap-2"
            onClick={handlePublish}
          >
            {/* <Sparkles size={14} /> GENERATIVE ENGINE */}
            <SendIcon size={14} /> PUBLISH
          </button>
        </div>

        <div className="flex items-center gap-1 p-2 bg-white flex-wrap">
          <div className="flex border-r-2 pr-2 gap-1 items-center">
            <button
              onClick={() => exec("formatBlock", "h1")}
              className="px-3 py-1 font-black border-2 border-black rounded hover:bg-black hover:text-white transition"
            >
              H1
            </button>
            <button
              onClick={() => exec("formatBlock", "h2")}
              className="px-3 py-1 font-black border border-slate-300 text-slate-400 rounded"
            >
              H2
            </button>
            <div className="flex gap-1 ml-2 pl-2 border-l-2">
              <button
                onClick={forceParagraph}
                className="p-2 bg-slate-100 text-slate-700 border border-slate-300 rounded hover:bg-black hover:text-white transition"
                title="To Paragraph (¶)"
              >
                <Pilcrow size={20} />
              </button>
              <button
                onClick={powerReset}
                className="p-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-600 hover:text-white transition"
                title="Deep Eraser"
              >
                <Eraser size={20} />
              </button>
            </div>
          </div>

          <div className="flex border-r-2 px-2 gap-1">
            <button
              onClick={() => exec("bold")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => exec("italic")}
              className="p-2 hover:bg-slate-100 rounded italic"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => exec("underline")}
              className="p-2 hover:bg-slate-100 rounded underline"
            >
              <Underline size={18} />
            </button>
          </div>

          <div className="flex border-r-2 px-2 gap-1">
            <button
              onClick={() => exec("justifyLeft")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <AlignLeft size={18} />
            </button>
            <button
              onClick={() => exec("justifyCenter")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <AlignCenter size={18} />
            </button>
            <button
              onClick={() => exec("justifyRight")}
              className="p-2 hover:bg-slate-100 rounded"
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>
            <button
              onClick={() => exec("justifyFull")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <AlignJustify size={18} />
            </button>
          </div>

          <div className="flex border-r-2 px-2 gap-1">
            <button
              onClick={() => exec("insertUnorderedList")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <List size={20} />
            </button>
            <button
              onClick={() => exec("insertOrderedList")}
              className="p-2 hover:bg-slate-100 rounded"
            >
              <ListOrdered size={20} />
            </button>
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "symbols" ? null : "symbols")
              }
              className={`p-2 rounded transition ${activeMenu === "symbols" ? "bg-black text-white" : ""}`}
            >
              <Omega size={20} />
            </button>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setShowImageModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded font-bold text-xs"
            >
              <ImageIcon size={14} /> MEDIA
            </button>
            <button
              onClick={addInnerNote}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded font-bold text-xs"
            >
              <Quote size={14} /> CALLOUT
            </button>
            <button
              onClick={addSideNote}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded font-bold text-xs"
            >
              <StickyNote size={14} /> SIDE NOTE
            </button>
          </div>
        </div>
      </header>

      {/* SYMBOL MENU */}
      {activeMenu === "symbols" && (
        <div className="fixed top-32 right-10 bg-white border-4 border-black shadow-[20px_20px_0px_rgba(0,0,0,0.1)] rounded-xl z-[250] w-[420px] flex flex-col max-h-[70vh]">
          {/* Pinned Header */}
          <div className="flex justify-between items-center p-6 border-b-2 bg-slate-50 rounded-t-lg shrink-0">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-500">
              Symbol Library
            </h3>
            <button
              onClick={() => setActiveMenu(null)}
              className="hover:bg-red-100 p-1 rounded transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* SCROLLABLE SECTION */}
          <div className="flex-1 overflow-y-auto p-6 custom-scroll">
            {Object.entries(SYMBOL_GROUPS).map(([name, set]) => (
              <div key={name} className="mb-6 last:mb-0">
                <p className="text-[10px] font-black text-indigo-600 uppercase mb-3 tracking-widest">
                  {name}
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {set.map((s) => (
                    <button
                      key={s}
                      onClick={() => exec("insertHTML", s)}
                      className="h-12 w-12 border-2 border-slate-100 hover:border-black hover:bg-black hover:text-white transition font-bold rounded-lg text-lg flex items-center justify-center"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* IMAGE UPLOAD MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-black text-xs uppercase tracking-widest">
                Insert Digital Figure
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={`p-12 m-6 border-4 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${dragActive ? "border-indigo-600 bg-indigo-50" : "border-slate-200"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileImage size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold text-center mb-6">
                Drag and drop your image here <br />{" "}
                <span className="text-xs font-normal">or</span>
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition"
              >
                <Upload size={16} /> Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && insertImage(e.target.files[0])
                }
              />
            </div>

            <div className="p-6 bg-slate-50 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                Supported: PNG, JPG, SVG, WebP
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SCROLLABLE WORKSPACE */}
      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-12 flex justify-center custom-scroll">
        <div
          className={`relative w-full max-w-[calc(100svw - 10px)] min-h-[1600px] h-fit shadow-2xl transition-all duration-300 ${theme} ${font} border border-slate-300 pb-96 doc-container`}
        >
          <div className="w-full items-center mb-0 flex p-10 gap-2 absolute flex-wrap">
            <span className="text-xs md:text-lg text-center font-black text-nowrap !text-[navyblue]">
              {courseCode} Pro Editor
            </span>
            {" | "}
            <span className="text-[#64748B] text-xs font-bold uppercase tracking-widest text-nowrap">
              Academic Content Environment
            </span>
          </div>
          <div className="px-20 pt-32 pb-12 mx-10 border-b-8 border-slate-900">
            <input
              value={topic}
              onBlur={() => saveNow()}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-3xl font-black uppercase tracking-tighter outline-none bg-transparent"
            />
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="prose-editor px-10 lg:px-20 py-10 outline-none text-lg leading-8] text-slate-900 min-h-[1200px] h-fit"
          >
            <h1>Omni-Architect Ready</h1>
            <p>
              Select this header and click the <b>¶ icon</b> to turn it back
              into a paragraph.
            </p>
            <ul>
              <li>Lists are visible and styled.</li>
              <li>Floating side notes are active.</li>
            </ul>
            <p>Please note: you must choose an image smaller than 5MB.</p>
            <p>
              Click <b>MEDIA</b> to use the new drag-and-drop modal.
            </p>
          </div>
        </div>
      </main>

      {/* DRAFT STATUS INDICATOR */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-lg transition-all duration-500">
        {lastSaved ? (
          <>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                Auto-Draft Active
              </span>
              <span className="text-xs font-bold text-slate-700">
                Last Synced: {lastSaved}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="h-3 w-3 rounded-full bg-slate-300"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                Local Storage
              </span>
              <span className="text-xs font-bold text-slate-400 italic">
                No active draft
              </span>
            </div>
          </>
        )}
      </div>

      {showDraftModal && (
        <DraftModal
          onDiscard={handleDraftDiscard}
          onRestore={handleDraftRestore}
        />
      )}

      {/* PUBLISHING OVERLAY MODAL */}
      {isPublishing && (
        <div className="fixed inset-0 z-[600] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="relative w-96 p-8 rounded-3xl border border-white/10 bg-white/5 shadow-2xl text-center">
            {/* THE ANIMATION ZONE (Place your code here) */}
            <div className="h-48 flex items-center justify-center mb-6 relative overflow-hidden">
              {/* The Central Cloud */}
              <div
                className={`relative z-20 ${publishPhase === "loading" ? "animate-cloud" : ""}`}
              >
                <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
                <CloudIcon
                  size={80}
                  className={
                    publishPhase === "error"
                      ? "text-red-500"
                      : "text-indigo-400"
                  }
                />

                {publishPhase === "success" && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 animate-zoom-in">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <Check size={32} className="text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Spiral Particles */}
              {publishPhase === "loading" && (
                <div className="absolute inset-0 z-10">
                  {[...Array(10)].map((_, i) => {
                    const angle = (i / 10) * 2 * Math.PI;
                    const x = Math.cos(angle) * 150;
                    const y = Math.sin(angle) * 150;

                    return (
                      <div
                        key={i}
                        className="animate-spiral"
                        style={
                          {
                            "--start-x": `${x}px`,
                            "--start-y": `${y}px`,
                            animationDelay: `${i * 0.2}s`,
                          } as React.CSSProperties
                        }
                      >
                        {i % 2 === 0 ? (
                          <FileText size={24} className="text-indigo-200/60" />
                        ) : (
                          <ImageIcon size={20} className="text-purple-300/60" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TEXT ZONE */}
            <div className="space-y-2">
              <h2 className="text-white font-black tracking-widest uppercase text-lg">
                {publishPhase === "loading"
                  ? publishStatus
                  : publishPhase === "success"
                    ? "Vaulted Successfully"
                    : "Uplink Failed"}
              </h2>
              <p className="text-slate-400 text-xs font-medium px-4 leading-relaxed">
                {publishPhase === "loading" &&
                  "Establishing secure handshake with academic nodes..."}
                {publishPhase === "success" &&
                  "Your manuscript has been digitized and stored."}
                {publishPhase === "error" &&
                  "A communication error occurred. Your draft is still safe."}
              </p>
            </div>

            {/* ACTION BUTTON (Visible after finish) */}
            {publishPhase !== "loading" && (
              <button
                onClick={() => setIsPublishing(false)}
                className={`mt-8 w-full py-4 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all shadow-lg
            ${
              publishPhase === "success"
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-white"
            }`}
              >
                {publishPhase === "success" ? "Continue" : "Close"}
              </button>
            )}
          </div>
        </div>
      )}
      <style jsx global>{`
         .prose-editor h1 {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 5rem;
          display: block;
        }
        .prose-editor h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 1rem;
          display: block;
        }
        .prose-editor ul {
          list-style-type: disc !important;
          margin-left: 3.5rem !important;
          margin-bottom: 2rem !important;
          display: block !important;
        }
        .prose-editor ol {
          list-style-type: decimal !important;
          margin-left: 3.5rem !important;
          margin-bottom: 2rem !important;
          display: block !important;
        }
        .prose-editor li {
          display: list-item !important;
          margin-bottom: 0.75rem;
        }

        /* INTERFACE & SCROLLBAR */
        .custom-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #cbd5e1;
        }

        /* FIGURE WRAPPER & DRAG/DROP PROTECTION */
        .figure-wrap {
          display: inline-block;
          position: relative;
          user-select: none !important;
          -webkit-user-modify: read-only !important;
          width: min-content !important;
          height: min-content !important;
        }

        .figure-wrap img {
          -webkit-user-drag: none;
          user-select: none;
          pointer-events: none;
        }

        /* Caption remains editable while parent is read-only */
        .figure-caption {
          -webkit-user-modify: read-write-plaintext-only !important;
          pointer-events: auto !important;
        }

        /* 4. DRAG & RESIZE MECHANICS */
        [data-action="drag-handle"],
        [data-action="delete-figure"] {
          pointer-events: all !important;
          cursor: pointer !important;
        }

        .resize-container {
          max-width: 100% !important;
          height: auto !important;
          pointer-events: auto !important;
          min-width: 80px;
          min-height: 80px;
        }

        /* This is the invisible layer that handles dragging */
        .drag-overlay {
          background: rgba(0, 0, 0, 0);
          /* Cuts a hole in the bottom-right so the resize handle is clickable */
          clip-path: polygon(
            0% 0%,
            100% 0%,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            0% 100%
          );
        }

        /* PUBLISHING SPIRAL ANIMATIONS */

        @keyframes spiral-ingest {
          0% {
            opacity: 0;
            transform: translate(var(--start-x), var(--start-y)) rotate(0deg)
              scale(1.2);
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            /* Elements rotate twice while pulling to the center point (0,0) */
            transform: translate(0, 0) rotate(720deg) scale(0);
          }
        }

        .animate-spiral {
          position: absolute;
          left: 50%;
          top: 50%;
          animation: spiral-ingest 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes cloud-pulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.6));
          }
        }
        .animate-cloud {
          animation: cloud-pulse 2s ease-in-out infinite;
        }

        /* 6. MODAL STATUS TRANSITIONS */
        @keyframes zoom-in {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }

        .animate-zoom-in {
          animation: zoom-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
