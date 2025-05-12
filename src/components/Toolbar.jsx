import { useState } from 'react';
import {
  BiChart,
  BiCircle,
  BiComment,
  BiEraser,
  BiGrid,
  BiImage,
  BiMinus,
  BiNote,
  BiPencil,
  BiPolygon,
  BiRedo,
  BiRightArrowAlt,
  BiSelectMultiple,
  BiShapeSquare,
  BiText,
  BiUndo,
} from 'react-icons/bi';
import '../styles/Toolbar.css';

function Toolbar({ onSelectTool }) {
  const [activeTool, setActiveTool] = useState('select');
  const [showShapesMenu, setShowShapesMenu] = useState(false);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);

  const handleToolSelect = (tool) => {
    setActiveTool(tool);
    onSelectTool(tool);
    setShowShapesMenu(false);
    setShowInsertMenu(false);
  };

  const toggleShapesMenu = () => {
    setShowShapesMenu(!showShapesMenu);
    setShowInsertMenu(false);
  };

  const toggleInsertMenu = () => {
    setShowInsertMenu(!showInsertMenu);
    setShowShapesMenu(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleShapeSelect = (shape) => {
    handleToolSelect(shape);
    setShowShapesMenu(false);
  };

  const handleInsert = (itemType) => {
    handleToolSelect(`insert-${itemType}`);
    setShowInsertMenu(false);
  };

  const handleStrokeWidthChange = (e) => {
    const width = parseInt(e.target.value, 10);
    setStrokeWidth(width);
    onSelectTool({ type: activeTool, strokeWidth: width, color });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onSelectTool({ type: activeTool, strokeWidth, color: newColor });
  };

  // Predefined monochromatic colors
  const monochromaticColors = [
    '#000000',
    '#333333',
    '#555555',
    '#777777',
    '#999999',
    '#bbbbbb',
    '#dddddd',
    '#ffffff',
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button
          className={`tool-btn ${activeTool === 'select' ? 'active' : ''}`}
          onClick={() => handleToolSelect('select')}
        >
          <BiSelectMultiple className="tool-icon" />
          <span className="tool-label">Selecionar</span>
        </button>
        <button
          className={`tool-btn ${activeTool === 'draw' ? 'active' : ''}`}
          onClick={() => handleToolSelect('draw')}
        >
          <BiPencil className="tool-icon" />
          <span className="tool-label">Desenhar</span>
        </button>
        <button
          className={`tool-btn ${activeTool === 'text' ? 'active' : ''}`}
          onClick={() => handleToolSelect('text')}
        >
          <BiText className="tool-icon" />
          <span className="tool-label">Texto</span>
        </button>
        <button
          className={`tool-btn ${activeTool === 'erase' ? 'active' : ''}`}
          onClick={() => handleToolSelect('erase')}
        >
          <BiEraser className="tool-icon" />
          <span className="tool-label">Apagar</span>
        </button>
      </div>

      <div className="toolbar-group">
        <div className="tool-dropdown">
          <button
            className={`tool-btn ${showShapesMenu ? 'active' : ''}`}
            onClick={toggleShapesMenu}
          >
            <BiShapeSquare className="tool-icon" />
            <span className="tool-label">Formas</span>
          </button>
          {showShapesMenu && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleShapeSelect('rectangle')}
              >
                <BiShapeSquare /> Retângulo
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleShapeSelect('circle')}
              >
                <BiCircle /> Círculo
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleShapeSelect('line')}
              >
                <BiMinus /> Linha
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleShapeSelect('arrow')}
              >
                <BiRightArrowAlt /> Seta
              </button>
            </div>
          )}
        </div>

        <div className="tool-dropdown">
          <button
            className={`tool-btn ${showInsertMenu ? 'active' : ''}`}
            onClick={toggleInsertMenu}
          >
            <BiImage className="tool-icon" />
            <span className="tool-label">Inserir</span>
          </button>
          {showInsertMenu && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleInsert('image')}
              >
                <BiImage /> Imagem
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleInsert('sticky-note')}
              >
                <BiNote /> Nota
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleInsert('comment')}
              >
                <BiComment /> Comentário
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleInsert('template')}
              >
                <BiGrid /> Template
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-group">
        <div className="color-picker-container">
          <button className="tool-btn" onClick={toggleColorPicker}>
            <div className="color-btn" style={{ backgroundColor: color }} />
            <span className="tool-label">Cor</span>
          </button>
          {showColorPicker && (
            <div className="dropdown-menu">
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{ width: '100%', height: '40px' }}
              />
              <div className="color-presets">
                {monochromaticColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => {
                      setColor(presetColor);
                      onSelectTool({
                        type: activeTool,
                        strokeWidth,
                        color: presetColor,
                      });
                    }}
                    style={{ backgroundColor: presetColor }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="stroke-width-container">
          <span className="stroke-width-label">Espessura</span>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
            className="stroke-width-slider"
          />
        </div>
      </div>

      <div className="toolbar-group">
        <button className="tool-btn" onClick={() => onSelectTool('undo')}>
          <BiUndo className="tool-icon" />
          <span className="tool-label">Desfazer</span>
        </button>
        <button className="tool-btn" onClick={() => onSelectTool('redo')}>
          <BiRedo className="tool-icon" />
          <span className="tool-label">Refazer</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
