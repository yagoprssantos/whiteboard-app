import { useEffect, useRef, useState } from 'react';
import '../styles/Canvas.css';
import LayersPanel from './LayersPanel';
import Toolbar from './Toolbar';

// Função simples para gerar IDs únicos sem depender da biblioteca uuid
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

function Canvas() {
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const [tool, setTool] = useState('select');
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [layers, setLayers] = useState([
    {
      id: generateId(),
      name: 'Camada 1',
      isVisible: true,
      elements: [],
    },
  ]);
  const [activeLayerId, setActiveLayerId] = useState(layers[0]?.id);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 });

  // Handle zoom with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      // Remove a verificação do ctrlKey
      e.preventDefault();

      // Calcula a posição do mouse relativa ao canvas
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Determina o fator de zoom com uma sensibilidade menor
      const delta = e.deltaY > 0 ? 0.95 : 1.05;
      const newScale = Math.max(0.1, Math.min(5, scale * delta));

      // Calcula o novo ponto de origem do zoom
      setZoomOrigin({
        x: x - (x - zoomOrigin.x) * (newScale / scale),
        y: y - (y - zoomOrigin.y) * (newScale / scale),
      });

      setScale(newScale);
    };

    const canvasElement = canvasRef.current;
    canvasElement?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvasElement?.removeEventListener('wheel', handleWheel);
    };
  }, [scale, zoomOrigin]);

  // Handle panning with space + drag
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setIsPanning(true);
        document.body.style.cursor = 'grab';
        if (contentRef.current) {
          contentRef.current.style.cursor = 'grab';
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsPanning(false);
        document.body.style.cursor = 'default';
        if (contentRef.current) {
          contentRef.current.style.cursor = 'default';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleDragStart = (e) => {
    if (isPanning || tool === 'pan') {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosX = position.x;
      const startPosY = position.y;

      const handleDragMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPosition({
          x: startPosX + dx,
          y: startPosY + dy,
        });
      };

      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        if (contentRef.current) {
          contentRef.current.classList.remove('grabbing');
          if (isPanning) {
            contentRef.current.classList.add('grab');
          }
        }
      };

      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }
  };

  const handleToolSelect = (selectedTool) => {
    if (selectedTool === 'pan') {
      setIsPanning(true);
      document.body.style.cursor = 'grab';
    } else {
      setIsPanning(false);
      document.body.style.cursor = 'default';
    }
    setTool(selectedTool);
  };

  const handleLayerAction = (action) => {
    switch (action.type) {
      case 'add': {
        const newLayer = {
          id: generateId(),
          name: `Camada ${layers.length + 1}`,
          isVisible: true,
          elements: [],
        };
        setLayers([...layers, newLayer]);
        setActiveLayerId(newLayer.id);
        break;
      }

      case 'delete': {
        if (layers.length <= 1) return; // Don't delete the last layer
        const remainingLayers = layers.filter(
          (layer) => layer.id !== action.layerId
        );
        setLayers(remainingLayers);

        // If we're deleting the active layer, select another one
        if (activeLayerId === action.layerId) {
          setActiveLayerId(remainingLayers[0].id);
        }
        break;
      }

      case 'select':
        setActiveLayerId(action.layerId);
        break;

      case 'rename':
        setLayers(
          layers.map((layer) =>
            layer.id === action.layerId
              ? { ...layer, name: action.name }
              : layer
          )
        );
        break;

      case 'visibility':
        setLayers(
          layers.map((layer) =>
            layer.id === action.layerId
              ? { ...layer, isVisible: action.isVisible }
              : layer
          )
        );
        break;

      case 'move': {
        const layerIndex = layers.findIndex(
          (layer) => layer.id === action.layerId
        );
        if (layerIndex === -1) return;

        const newLayers = [...layers];
        const targetIndex =
          action.direction === 'up'
            ? Math.max(0, layerIndex - 1)
            : Math.min(layers.length - 1, layerIndex + 1);

        if (layerIndex === targetIndex) return;

        // Swap layers
        [newLayers[layerIndex], newLayers[targetIndex]] = [
          newLayers[targetIndex],
          newLayers[layerIndex],
        ];

        setLayers(newLayers);
        break;
      }

      default:
        console.log('Unknown action:', action);
    }
  };

  const contentStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
  };

  return (
    <div className="canvas-container" ref={canvasRef}>
      <Toolbar onSelectTool={handleToolSelect} />
      <LayersPanel layers={layers} onLayerAction={handleLayerAction} />
      <div
        className={`canvas-content ${
          isPanning
            ? contentRef.current?.style.cursor === 'grabbing'
              ? 'grabbing'
              : 'grab'
            : ''
        }`}
        ref={contentRef}
        style={contentStyle}
        onMouseDown={(e) => {
          if (isPanning) {
            e.preventDefault();
            if (contentRef.current) {
              contentRef.current.classList.remove('grab');
              contentRef.current.classList.add('grabbing');
            }
            handleDragStart(e);
          }
        }}
        onMouseUp={() => {
          if (isPanning && contentRef.current) {
            contentRef.current.classList.remove('grabbing');
            contentRef.current.classList.add('grab');
          }
        }}
      >
        {/* Render visible layers and their elements */}
        {layers
          .filter((layer) => layer.isVisible)
          .map((layer) => (
            <div
              key={layer.id}
              className={`layer ${
                layer.id === activeLayerId ? 'active-layer' : ''
              }`}
            >
              {/* Render layer elements here */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Canvas;
