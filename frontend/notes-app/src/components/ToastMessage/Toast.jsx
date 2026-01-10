import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

// type: "add" | "delete" | "error" | "info" (we treat anything not "delete" as success/info)
const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (!isShown) return;

    const timeoutId = setTimeout(() => {
      onClose();
    }, 3200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isShown, onClose]);

  const isDestructive = type === "delete" || type === "error";

  return (
    <div
      className={`fixed top-20 right-4 md:right-6 z-[9999] transform-gpu transition-all duration-300 ease-out ${
        isShown
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : "opacity-0 -translate-y-2 translate-x-2 scale-95 pointer-events-none"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`min-w-[280px] max-w-[90vw] md:max-w-md rounded-2xl relative overflow-hidden border shadow-lg backdrop-blur-sm
          ${
            isDestructive
              ? "bg-red-50/95 dark:bg-red-900/15 border-red-200/80 dark:border-red-800/80"
              : "bg-emerald-50/95 dark:bg-emerald-900/15 border-emerald-200/70 dark:border-emerald-800/70"
          }
          before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full
          ${
            isDestructive
              ? "before:bg-gradient-to-b from-red-500 via-red-400 to-red-500"
              : "before:bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500"
          }
        `}
      >
        <div className="flex items-center gap-3 py-3.5 px-4 pl-5">
          <div
            className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full shadow-sm
              ${
                isDestructive
                  ? "bg-red-100/90 dark:bg-red-900/40"
                  : "bg-emerald-100/90 dark:bg-emerald-900/40"
              }
            `}
          >
            {isDestructive ? (
              <MdDeleteOutline className="text-xl text-red-600 dark:text-red-300" />
            ) : (
              <LuCheck className="text-xl text-emerald-600 dark:text-emerald-300" />
            )}
          </div>

          <p className="text-sm md:text-[15px] font-medium text-slate-900 dark:text-slate-50 break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
