export default function SearchDropdown({ results, onSelect }) {
  if (!results.length) return null;

  return (
    <div className="dropdown">
      {results.slice(0, 12).map((s, idx) => (
        <button key={idx} className="dropItem" onClick={() => onSelect(s)}>
          <div className="dropTitle">{s.song}</div>
          <div className="dropSub">{s.artist}</div>
        </button>
      ))}
    </div>
  );
}
