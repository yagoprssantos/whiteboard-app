import '../styles/Toolbar.css';

function Toolbar({ onSelectTool }) {
  return (
    <div className="toolbar">
      <button onClick={() => onSelectTool('select')}>Select</button>
      <button onClick={() => onSelectTool('draw')}>Draw</button>
      <button onClick={() => onSelectTool('rectangle')}>Rectangle</button>
      <button onClick={() => onSelectTool('circle')}>Circle</button>
    </div>
  );
}

export default Toolbar;
