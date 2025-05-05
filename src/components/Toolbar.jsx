function Toolbar({ onSelectTool }) {
  return (
    <div className="toolbar">
      <button onClick={() => onSelectTool('draw')}>Pincel</button>
      <button onClick={() => onSelectTool('rectangle')}>Retângulo</button>
      <button onClick={() => onSelectTool('circle')}>Círculo</button>
      <button onClick={() => onSelectTool('line')}>Linha</button>
    </div>
  );
}

export default Toolbar;
