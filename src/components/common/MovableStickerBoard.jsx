import React, { useState, useRef } from "react";
import { INITIAL_STICKERS } from "../../data/initialData";
import { Move, Plus, RotateCcw, X, Sparkles, Smile } from "lucide-react";
import confetti from "canvas-confetti";

export const MovableStickerBoard = () => {
  const [stickers, setStickers] = useState(INITIAL_STICKERS);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newText, setNewText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const draggingRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    const sticker = stickers.find((s) => s.id === id);
    if (!sticker) return;

    draggingRef.current = id;
    offsetRef.current = {
      x: e.clientX - sticker.x,
      y: e.clientY - sticker.y
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const currentId = draggingRef.current;
    const newX = Math.max(10, Math.min(window.innerWidth - 180, e.clientX - offsetRef.current.x));
    const newY = Math.max(10, Math.min(window.innerHeight - 100, e.clientY - offsetRef.current.y));

    setStickers((prev) =>
      prev.map((s) => (s.id === currentId ? { ...s, x: newX, y: newY } : s))
    );
  };

  const handlePointerUp = () => {
    draggingRef.current = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handleAddSticker = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const colors = ["#FFE600", "#FF5A5F", "#00F59B", "#00D2FF", "#B388FF", "#FF9F1C"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRotate = Math.floor(Math.random() * 14) - 7;

    const newSticker = {
      id: `custom-${Date.now()}`,
      text: newText.trim(),
      x: 60 + Math.random() * 100,
      y: 80 + Math.random() * 100,
      color: randomColor,
      rotate: randomRotate
    };

    try {
      confetti({ particleCount: 30, spread: 60, origin: { x: 0.5, y: 0.3 } });
    } catch (e) {}

    setStickers((prev) => [...prev, newSticker]);
    setNewText("");
    setShowInput(false);
  };

  const handleReset = () => {
    setStickers(INITIAL_STICKERS);
  };

  return (
    <>
      {/* Floating Control Toolbar */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="brutal-btn px-3 py-2 rounded-lg bg-[#FFE600] font-black text-xs text-black flex items-center gap-1.5"
          title="Toggle Movable Stickers Playground"
        >
          <Smile className="w-4 h-4" />
          <span>{isMinimized ? "Show Stickers" : "Stickers Playground"}</span>
        </button>

        {!isMinimized && (
          <>
            <button
              onClick={() => setShowInput(!showInput)}
              className="brutal-btn px-2.5 py-2 rounded-lg bg-[#00F59B] text-black font-black text-xs flex items-center gap-1"
              title="Add Custom Sticker"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>

            <button
              onClick={handleReset}
              className="brutal-btn p-2 rounded-lg bg-white text-black font-black text-xs"
              title="Reset Sticker Positions"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Add Custom Sticker Popup */}
      {showInput && !isMinimized && (
        <div className="fixed bottom-20 left-6 z-40 p-3 rounded-xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] w-64 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase">Create Custom Sticker</span>
            <button onClick={() => setShowInput(false)}>
              <X className="w-4 h-4 text-black" />
            </button>
          </div>
          <form onSubmit={handleAddSticker} className="space-y-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="e.g. ⚡ Bug Hunter"
              maxLength={24}
              className="w-full px-2.5 py-1.5 border-2 border-black rounded text-xs font-bold text-black focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-1.5 bg-[#FF5A5F] text-white border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
            >
              Stick it!
            </button>
          </form>
        </div>
      )}

      {/* Render Movable Stickers */}
      {!isMinimized && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {stickers.map((sticker) => (
            <div
              key={sticker.id}
              onPointerDown={(e) => handlePointerDown(e, sticker.id)}
              style={{
                left: `${sticker.x}px`,
                top: `${sticker.y}px`,
                backgroundColor: sticker.color,
                transform: `rotate(${sticker.rotate}deg)`,
                position: "absolute"
              }}
              className="pointer-events-auto draggable-item px-3 py-1.5 rounded-lg border-[3px] border-black shadow-[4px_4px_0px_0px_#000] font-black text-xs text-black flex items-center gap-1.5 select-none hover:scale-105 transition-transform"
            >
              <Move className="w-3 h-3 text-black/70 shrink-0" />
              <span>{sticker.text}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
