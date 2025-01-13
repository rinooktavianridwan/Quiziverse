import { useState, useEffect } from "react";

const useResponsiveSize = (size) => {
  const [adjustedSize, setAdjustedSize] = useState(size);

  const updateSize = () => {
    if (window.innerWidth <= 600) {
      setAdjustedSize(size * 0.4);
    } else if (window.innerWidth <= 1024) {
      setAdjustedSize(size * 0.7);
    } else {
      setAdjustedSize(size);
    }
  };

  useEffect(() => {
    updateSize(); // Initial size calculation
    window.addEventListener("resize", updateSize); // Update on resize
    return () => window.removeEventListener("resize", updateSize); // Cleanup
  }, [size]);

  return adjustedSize;
};

export default useResponsiveSize;
