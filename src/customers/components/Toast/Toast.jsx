import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "./ToastAction";

const Toast = ({ msg, delay = 1000, type = "success" }) => {
  const [progress, setProgress] = useState(100);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  console.log("showToast", showToast);

  useEffect(() => {
    // 1. Reset component state whenever the effect re-runs
    setShowToast(true);
    setProgress(100);

    let startTime = null;
    let animationFrameId = null;

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      // Calculate remaining percentage based on actual time elapsed
      const remainingPercent = Math.max(0, 100 - (elapsed / delay) * 100);

      if (elapsed >= delay) {
        setProgress(0);
        setShowToast(false);
        dispatch(hideToast());
      } else {
        setProgress(remainingPercent);
        // Request next frame smoothly
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateProgress);

    // Clean up to prevent memory leaks if the component unmounts mid-animation
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [msg, delay]); // Triggers fresh animation if msg or delay changes

  if (!showToast) return null;

  return (
    <div className="p-2 fixed top-18 min-w-[250px] right-5 bg-white shadow-md border rounded-sm z-[1400]">
      <p className="mb-2 font-semibold">{msg}</p>
      <div className="w-full h-2.5 bg-gray-200 rounded-sm overflow-hidden">
        <div
          // Crucial: Notice we removed "transition-all" completely.
          // requestAnimationFrame updates 60+ times per second; CSS transitions would fight it.
          className={`h-full rounded-sm ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
