import { useEffect, useState } from 'react';
import {
  BiChevronDown,
  BiChevronUp,
  BiHide,
  BiLayerMinus,
  BiLayerPlus,
  BiRename,
  BiShow,
  BiTrash,
  BiX,
} from 'react-icons/bi';
import '../styles/LayersPanel.css';

function LayersPanel({ layers = [], onLayerAction }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [editingLayerId, setEditingLayerId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Select the first layer when the component mounts
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

  const handleMoveLayer = (e, layerId, direction) => {
    e.stopPropagation();
    onLayerAction({ type: 'move', layerId, direction });
  };

  const startEditing = (e, layer) => {
    e.stopPropagation();
    setEditingLayerId(layer.id);
    setEditingName(layer.name);
  };

  const handleNameChange = (e) => {
    setEditingName(e.target.value);
  };

  const saveLayerName = () => {
    if (editingLayerId) {
      onLayerAction({
        type: 'rename',
        layerId: editingLayerId,
        name: editingName,
      });
      setEditingLayerId(null);
    }
  };

  // Handle Enter key press to save layer name
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveLayerName();
    }
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
          <div className="layers-list">
            {layers.length === 0 ? (
              <div className="no-layers-message">Nenhuma camada criada</div>
            ) : (
              layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`layer-item ${
                    selectedLayerId === layer.id ? 'selected' : ''
                  }`}
                  onClick={() => handleLayerSelect(layer.id)}
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
                      className="control-btn"
                      onClick={(e) => startEditing(e, layer)}
                      title="Renomear"
                    >
                      <BiRename />
                    </button>

                    <button
                      className="control-btn"
                      onClick={(e) => handleMoveLayer(e, layer.id, 'up')}
                      disabled={layers.indexOf(layer) === 0}
                      title="Mover para cima"
                    >
                      <BiChevronUp />
                    </button>

                    <button
                      className="control-btn"
                      onClick={(e) => handleMoveLayer(e, layer.id, 'down')}
                      disabled={layers.indexOf(layer) === layers.length - 1}
                      title="Mover para baixo"
                    >
                      <BiChevronDown />
                    </button>

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
