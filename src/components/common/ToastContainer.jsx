import React from "react";
import { useClub } from "../../context/ClubContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useClub();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isError = toast.type === "error";

        const bg = isSuccess
          ? "bg-[#00F59B]"
          : isWarning
          ? "bg-[#FFE600]"
          : isError
          ? "bg-[#FF5A5F] text-white"
          : "bg-[#00D2FF]";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-3 border-black shadow-[5px_5px_0px_0px_#000] text-black ${bg} animate-in slide-in-from-right-8 duration-200`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-black stroke-[2.5]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-black stroke-[2.5]" />}
              {isError && <AlertCircle className="w-5 h-5 text-white stroke-[2.5]" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-black stroke-[2.5]" />}
            </div>

            <div className="flex-1 text-xs">
              <h4 className="font-black uppercase tracking-wider text-black">{toast.title}</h4>
              <p className="mt-0.5 text-black/90 font-bold leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-black hover:bg-black hover:text-white rounded transition-colors"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
