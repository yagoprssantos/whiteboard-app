import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/Canvas.css';
import Toolbar from './Toolbar';

function Canvas() {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, transform: { x: 0, y: 0 } });
  const lastTransform = useRef({ x: 0, y: 0, scale: 1 });

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      transform: { ...lastTransform.current },
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      const newTransform = {
        x: dragStart.current.transform.x + dx,
        y: dragStart.current.transform.y + dy,
        scale: lastTransform.current.scale,
      };

      setTransform(newTransform);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      lastTransform.current = transform;
      setIsDragging(false);
    }
  }, [isDragging, transform]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomIntensity = 0.001;
      const delta = -e.deltaY;
      const newScale = Math.min(
        Math.max(0.1, transform.scale * (1 + delta * zoomIntensity)),
        5
      );

      const scaleRatio = 1 - newScale / transform.scale;
      const newTransform = {
        scale: newScale,
        x: transform.x + (mouseX - transform.x) * scaleRatio,
        y: transform.y + (mouseY - transform.y) * scaleRatio,
      };

      setTransform(newTransform);
      lastTransform.current = newTransform;
    },
    [transform]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <div className="canvas-container" ref={containerRef}>
      <Toolbar />
      <div className="canvas-viewport">
        <div
          className="canvas-content"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
}

export default Canvas;
