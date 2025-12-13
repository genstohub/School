"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pencil,
  Minus,
  Square,
  Circle,
  ArrowRight,
  Eraser,
  Trash2,
  Undo,
  Redo,
  Wrench,
  Palette,
  Sliders,
} from "lucide-react";
import "./Mth101Graph.css";

type Tool = "draw" | "line" | "rect" | "circle" | "text" | "arrow" | "erase";

export default function Mth101InteractiveGraphBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>("draw");
  const [color, setColor] = useState("#0ea5e9");
  const [lineWidth, setLineWidth] = useState(2);
  const [actions, setActions] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );

  /** 🎨 Draw Grid */
  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
      const small = 20;
      const big = 100;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += small) {
        ctx.beginPath();
        ctx.strokeStyle =
          x % big === 0 ? "rgba(6,78,59,0.06)" : "rgba(14,165,233,0.06)";
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += small) {
        ctx.beginPath();
        ctx.strokeStyle =
          y % big === 0 ? "rgba(6,78,59,0.06)" : "rgba(14,165,233,0.04)";
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = "rgba(156,163,175,0.6)";
      ctx.lineWidth = 1.2;
      ctx.moveTo(0, height / 2 + 0.5);
      ctx.lineTo(width, height / 2 + 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width / 2 + 0.5, 0);
      ctx.lineTo(width / 2 + 0.5, height);
      ctx.stroke();
    },
    []
  );

  /** 📏 Resize Canvas */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapperRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(450 * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = "450px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGrid(ctx, rect.width, 450);
  }, [drawGrid]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /** ✏ Start Drawing */
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPos({ x, y });
    setDrawing(true);
    setRedoStack([]);

    // Save state for undo
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setActions((prev) => [...prev, snapshot]);

    if (tool === "draw" || tool === "erase") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  /** 🖌 Drawing logic */
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas || !startPos) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === "erase" ? "#fff" : color;

    if (tool === "draw" || tool === "erase") {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.putImageData(actions[actions.length - 1], 0, 0);
      ctx.beginPath();
      switch (tool) {
        case "line":
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(x, y);
          break;
        case "rect":
          ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
          );
          ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
          break;
        case "arrow":
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(x, y);
          break;
      }
      ctx.stroke();
    }
  };

  const endDraw = () => setDrawing(false);

  /** ↩ Undo / Redo */
  const handleUndo = () => {
    if (actions.length < 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prev = [...actions];
    const last = prev.pop();
    if (last) setRedoStack((r) => [...r, last]);
    setActions(prev);
    if (prev.length === 0) resizeCanvas();
    else ctx.putImageData(prev[prev.length - 1], 0, 0);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const redo = [...redoStack];
    const next = redo.pop();
    if (next) {
      ctx.putImageData(next, 0, 0);
      setActions((a) => [...a, next]);
      setRedoStack(redo);
    }
  };

  /** TOOL LIST */
  const toolsList = [
    { name: "draw", icon: <Pencil size={16} />, label: "Draw" },
    { name: "line", icon: <Minus size={16} />, label: "Line" },
    { name: "rect", icon: <Square size={16} />, label: "Rectangle" },
    { name: "circle", icon: <Circle size={16} />, label: "Circle" },
    { name: "arrow", icon: <ArrowRight size={16} />, label: "Arrow" },
    { name: "erase", icon: <Eraser size={16} />, label: "Eraser" },
  ];

  return (
    <div className="graph-page">
      <header className="graph-header">
        <h2 className="font-semibold text-gray-700">Graph Practical Board</h2>
        <div className="zoom-controls flex items-center gap-2">
          <button
            className="px-2 py-1 bg-white/20 rounded-md flex items-center gap-1"
            onClick={handleUndo}
          >
            <Undo size={14} /> Undo
          </button>
          <button
            className="px-2 py-1 bg-white/20 rounded-md flex items-center gap-1"
            onClick={handleRedo}
          >
            <Redo size={14} /> Redo
          </button>
        </div>
      </header>

      <main className="graph-main">
        {/* SIDEBAR */}
        <aside className="graph-sidebar">
          <h4 className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-2">
            <Wrench size={14} /> Tools
          </h4>
          {toolsList.map((item) => (
            <button
              key={item.name}
              onClick={() => setTool(item.name as Tool)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 transition ${
                tool === item.name
                  ? "bg-blue-500/30 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div className="my-3 border-t border-gray-300/40" />

          <div className="flex flex-col gap-2">
            <label className="text-xs flex items-center gap-2 text-gray-600">
              <Palette size={14} /> Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-8 rounded-lg cursor-pointer"
            />

            <label className="text-xs flex items-center gap-2 text-gray-600">
              <Sliders size={14} /> Stroke
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
          </div>

          <div className="my-3 border-t border-gray-300/40" />

          <button
            onClick={() => resizeCanvas()}
            className="w-full px-3 py-2 bg-red-500/20 text-red-700 rounded-lg text-sm flex items-center gap-2"
          >
            <Trash2 size={14} /> Clear
          </button>
        </aside>

        {/* CANVAS */}
        <section className="graph-canvas-area">
          <div className="graph-canvas-wrapper" ref={wrapperRef}>
            <canvas
              ref={canvasRef}
              className="graph-canvas"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
            />
          </div>
        </section>
      </main>
    </div>
  );
}