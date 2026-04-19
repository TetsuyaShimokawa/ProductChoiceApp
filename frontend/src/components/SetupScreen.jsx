import { useState } from "react";

export default function SetupScreen({ onStart }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  function handleStart() {
    const num = parseInt(id, 10);
    if (!id || isNaN(num) || num <= 0) {
      setError("有効な被験者IDを入力してください（1以上の整数）");
      return;
    }
    setError("");
    onStart(String(num));
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Product Choice Experiment</h1>
        <p style={styles.subtitle}>商品選択実験</p>
        <div style={styles.form}>
          <label style={styles.label}>被験者ID</label>
          <input
            type="number"
            min="1"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="数値を入力"
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button onClick={handleStart} style={styles.button}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "48px 40px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "36px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    textAlign: "left",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "700",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
