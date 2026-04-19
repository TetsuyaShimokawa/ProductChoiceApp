import { useState, useEffect } from "react";
import SetupScreen from "./components/SetupScreen";
import ExperimentScreen from "./components/ExperimentScreen";
import FinishScreen from "./components/FinishScreen";
import { fetchProducts, postResult } from "./api/client";

const SCREENS = { SETUP: "setup", EXPERIMENT: "experiment", FINISH: "finish" };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SETUP);
  const [studentId, setStudentId] = useState("");
  const [products, setProducts] = useState([]);
  const [completedTrials, setCompletedTrials] = useState(0);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  function handleStart(id) {
    setStudentId(id);
    setCompletedTrials(0);
    setScreen(SCREENS.EXPERIMENT);
  }

  async function handleTrialFinish(resultData) {
    try {
      await postResult(resultData);
    } catch (err) {
      console.error("Save failed:", err);
    }
    const next = completedTrials + 1;
    setCompletedTrials(next);
    if (next >= products.length) {
      setScreen(SCREENS.FINISH);
    }
  }

  return (
    <>
      {screen === SCREENS.SETUP && <SetupScreen onStart={handleStart} />}
      {screen === SCREENS.EXPERIMENT && products.length > 0 && (
        <ExperimentScreen
          key={studentId}
          studentId={studentId}
          products={products}
          onFinish={handleTrialFinish}
        />
      )}
      {screen === SCREENS.FINISH && <FinishScreen studentId={studentId} />}
    </>
  );
}
