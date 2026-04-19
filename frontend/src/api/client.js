// 開発時はViteのプロキシ経由、本番はRenderのバックエンドURLを使用
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function postResult(data) {
  const res = await fetch(`${BASE}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save result");
  return res.json();
}

export function downloadCsv(studentId) {
  window.open(`${BASE}/results/${studentId}`, "_blank");
}
