import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);
  return dimensions;
};
