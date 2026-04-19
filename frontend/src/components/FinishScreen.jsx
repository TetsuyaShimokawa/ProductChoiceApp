import { downloadCsv } from "../api/client";

export default function FinishScreen({ studentId }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h1 style={styles.title}>実験が終了しました</h1>
        <p style={styles.message}>
          結果は正常に保存されました。<br />
          ご参加ありがとうございました。
        </p>
        <button
          style={styles.csvButton}
          onClick={() => downloadCsv(studentId)}
        >
          結果をCSVでダウンロード
        </button>
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
    padding: "56px 40px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "440px",
    textAlign: "center",
  },
  icon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#fff",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#1a1a2e",
  },
  message: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "32px",
  },
  csvButton: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#f0f2f5",
    color: "#1a1a2e",
    border: "2px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
