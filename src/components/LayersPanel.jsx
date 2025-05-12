import { useEffect, useRef, useState } from 'react';
import { BiHide, BiLayerPlus, BiShow, BiTrash, BiX } from 'react-icons/bi';
import '../styles/LayersPanel.css';

function LayersPanel({ layers = [], onLayerAction }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [editingLayerId, setEditingLayerId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [draggedLayer, setDraggedLayer] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragPosition, setDragPosition] = useState(null); // 'top', 'bottom', or 'between'
  const layerRefs = useRef({});

  useEffect(() => {
    if (layers.length > 0 && !selectedLayerId) {
      setSelectedLayerId(layers[0].id);
      onLayerAction({ type: 'select', layerId: layers[0].id });
    }
  }, [layers, selectedLayerId, onLayerAction]);

  const handleTogglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLayerSelect = (layerId) => {
    setSelectedLayerId(layerId);
    onLayerAction({ type: 'select', layerId });
  };

  const handleAddLayer = () => {
    onLayerAction({ type: 'add' });
  };

  const handleDeleteLayer = (e, layerId) => {
    e.stopPropagation();
    onLayerAction({ type: 'delete', layerId });
  };

  const handleToggleVisibility = (e, layerId, isVisible) => {
    e.stopPropagation();
    onLayerAction({ type: 'visibility', layerId, isVisible: !isVisible });
  };

  const handleDoubleClick = (e, layer) => {
    if (e.target.classList.contains('layer-name')) {
      setEditingLayerId(layer.id);
      setEditingName(layer.name);
    }
  };

  const handleNameChange = (e) => {
    setEditingName(e.target.value);
  };

  const saveLayerName = () => {
    if (editingLayerId && editingName.trim()) {
      onLayerAction({
        type: 'rename',
        layerId: editingLayerId,
        name: editingName.trim(),
      });
      setEditingLayerId(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveLayerName();
    }
  };

  const handleDragStart = (e, layer) => {
    e.stopPropagation();
    setDraggedLayer(layer);
    e.dataTransfer.setData('text/plain', layer.id);
    e.currentTarget.classList.add('dragging');
  };

  const getDropPosition = (mouseY, rect, index) => {
    const relativeY = mouseY - rect.top;
    const height = rect.height;
    const threshold = height * 0.3; // 30% da altura do item

    if (relativeY < threshold) {
      return 'top';
    } else if (relativeY > height - threshold) {
      return 'bottom';
    } else {
      return index === 0 ? 'top' : 'bottom';
    }
  };

  const handleDragOver = (e, targetLayer, index) => {
    e.preventDefault();
    if (!draggedLayer || targetLayer.id === draggedLayer.id) return;

    const rect = layerRefs.current[targetLayer.id].getBoundingClientRect();
    const mouseY = e.clientY;
    const position = getDropPosition(mouseY, rect, index);

    // Atualiza a posição apenas se houver mudança
    if (dragPosition !== position || dragOverIndex !== index) {
      setDragOverIndex(index);
      setDragPosition(position);
    }
  };

  const handleDragOverList = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('receiving-drag');
  };

  const handleDragLeaveList = (e) => {
    e.currentTarget.classList.remove('receiving-drag');
  };

  const handleDrop = (e, targetLayer, index) => {
    const element = layerRefs.current[targetLayer.id];
    element.classList.add('dropping');
    setTimeout(() => element.classList.remove('dropping'), 600);

    e.preventDefault();
    if (!draggedLayer) return;

    const draggedIndex = layers.findIndex((l) => l.id === draggedLayer.id);
    let newIndex = index;

    if (dragPosition === 'bottom') {
      newIndex += 1;
    }

    // Ajusta o índice se estiver movendo para baixo
    if (draggedIndex < newIndex) {
      newIndex--;
    }

    const newLayers = [...layers];
    const [removed] = newLayers.splice(draggedIndex, 1);
    newLayers.splice(newIndex, 0, removed);

    onLayerAction({ type: 'reorder', layers: newLayers });
    setDraggedLayer(null);
    setDragOverIndex(null);
    setDragPosition(null);
  };

  return (
    <div className={`layers-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="layers-header">
        {!isCollapsed && <h3>Camadas</h3>}
        <button
          className="toggle-panel-button"
          onClick={handleTogglePanel}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
        >
          {isCollapsed ? <BiLayerPlus /> : <BiX />}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div
            className="layers-list"
            onDragOver={handleDragOverList}
            onDragLeave={handleDragLeaveList}
          >
            {layers.length === 0 ? (
              <div className="no-layers-message">Nenhuma camada criada</div>
            ) : (
              layers.map((layer, index) => (
                <div
                  key={layer.id}
                  ref={(el) => (layerRefs.current[layer.id] = el)}
                  className={`layer-item ${
                    draggedLayer?.id === layer.id ? 'dragging' : ''
                  } ${dragOverIndex === index ? `drop-${dragPosition}` : ''} ${
                    selectedLayerId === layer.id ? 'selected' : ''
                  }`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, layer, index)}
                  onDragOver={(e) => handleDragOver(e, layer, index)}
                  onDrop={(e) => handleDrop(e, layer, index)}
                  onDragEnd={() => {
                    setDraggedLayer(null);
                    setDragOverIndex(null);
                    setDragPosition(null);
                  }}
                  onClick={() => handleLayerSelect(layer.id)}
                  onDoubleClick={(e) => handleDoubleClick(e, layer)}
                >
                  <div className="layer-visibility">
                    <button
                      className="control-btn"
                      onClick={(e) =>
                        handleToggleVisibility(e, layer.id, layer.isVisible)
                      }
                      title={layer.isVisible ? 'Ocultar' : 'Mostrar'}
                    >
                      {layer.isVisible ? <BiShow /> : <BiHide />}
                    </button>
                  </div>

                  <div className="layer-preview">
                    {/* Layer preview thumbnail would go here */}
                  </div>

                  <div className="layer-info">
                    {editingLayerId === layer.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={handleNameChange}
                        onBlur={saveLayerName}
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    ) : (
                      <span className="layer-name">{layer.name}</span>
                    )}
                  </div>

                  <div className="layer-controls">
                    <button
                      className="control-btn delete"
                      onClick={(e) => handleDeleteLayer(e, layer.id)}
                      disabled={layers.length <= 1}
                      title="Excluir"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="layers-footer">
            <button
              className="add-layer-button"
              onClick={handleAddLayer}
              title="Nova camada"
            >
              <BiLayerPlus /> Nova camada
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LayersPanel;
