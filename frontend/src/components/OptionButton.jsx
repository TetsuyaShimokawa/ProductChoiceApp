const ATTR_FORMAT = {
  Price_Dollar: (v) => `価格: ¥${v.toLocaleString()}`,
  QualityScore_Point: (v) => `品質スコア: ${v} 点`,
  RAM_GB: (v) => `RAM: ${v} GB`,
  Resolution_MP: (v) => `解像度: ${v} MP`,
  NC_Level_Hour: (v) => `NCレベル: ${v} 時間`,
  Range_km: (v) => `航続距離: ${v} km`,
  DurabilityScore_Point: (v) => `耐久性スコア: ${v} 点`,
  RiskLevel_Point: (v) => `リスクレベル: ${v} 点`,
  ExpectedReturn_Percent: (v) => `期待収益率: ${v} %`,
};

export default function OptionButton({ choice, onClick, disabled }) {
  const attrEntries = Object.entries(choice.attributes);

  return (
    <button
      onClick={() => !disabled && onClick(choice)}
      disabled={disabled}
      style={{ ...styles.button, ...(disabled ? styles.buttonDisabled : {}) }}
    >
      <span style={styles.name}>{choice.name}</span>
      {attrEntries.map(([key, val]) => (
        <span key={key} style={styles.attr}>
          {ATTR_FORMAT[key] ? ATTR_FORMAT[key](val) : `${key}: ${val}`}
        </span>
      ))}
    </button>
  );
}

const styles = {
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "20px",
    background: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.15s",
    minHeight: "110px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  name: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#1a1a2e",
    marginBottom: "4px",
  },
  attr: {
    fontSize: "13px",
    color: "#555",
  },
};
