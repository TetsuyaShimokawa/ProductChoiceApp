import { useEffect, useState, useCallback } from "react";
import OptionButton from "./OptionButton";
import { useTimer } from "../hooks/useTimer";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExperimentScreen({ studentId, products, onFinish }) {
  const [order, setOrder] = useState([]);
  const [trialIndex, setTrialIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const { start, stop } = useTimer();

  useEffect(() => {
    const shuffled = shuffle(products);
    setOrder(shuffled);
  }, [products]);

  useEffect(() => {
    if (order.length === 0) return;
    const product = order[trialIndex];
    setShuffledChoices(shuffle(product.choices));
    start();
  }, [order, trialIndex, start]);

  const handleSelect = useCallback(
    async (choice) => {
      const reactionTime = stop();
      const product = order[trialIndex];
      await onFinish({
        student_id: studentId,
        trial: trialIndex + 1,
        problem_id: product.id,
        selected_option_id: choice.id,
        selected_option_name: choice.name,
        reaction_time: parseFloat(reactionTime.toFixed(3)),
      });
      if (trialIndex + 1 < order.length) {
        setTrialIndex((i) => i + 1);
      }
    },
    [order, trialIndex, studentId, stop, onFinish]
  );

  if (order.length === 0) return null;

  const product = order[trialIndex];
  const total = order.length;
  const cols = Math.min(3, shuffledChoices.length);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.category}>{product.name}</span>
        <span style={styles.progress}>
          Product {trialIndex + 1} / {total}
        </span>
      </div>

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {shuffledChoices.map((choice) => (
          <OptionButton key={choice.id} choice={choice} onClick={handleSelect} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  progress: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#4f46e5",
    background: "#eef2ff",
    padding: "6px 14px",
    borderRadius: "20px",
  },
  grid: {
    display: "grid",
    gap: "20px",
    padding: "20px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
  },
};
