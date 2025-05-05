import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import Toolbar from './Toolbar';

function Canvas() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleToolSelect = (tool) => {
    if (!canvas) return;

    if (tool === 'draw') {
      canvas.isDrawingMode = true;
    } else {
      canvas.isDrawingMode = false;
      if (tool === 'rectangle') {
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'blue',
          width: 100,
          height: 100,
        });
        canvas.add(rect);
      } else if (tool === 'circle') {
        const circle = new fabric.Circle({
          left: 150,
          top: 150,
          fill: 'green',
          radius: 50,
        });
        canvas.add(circle);
      } else if (tool === 'line') {
        const line = new fabric.Line([50, 50, 200, 200], {
          stroke: 'black',
          strokeWidth: 2,
        });
        canvas.add(line);
      }
    }
  };

  return (
    <div>
      <Toolbar onSelectTool={handleToolSelect} />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
