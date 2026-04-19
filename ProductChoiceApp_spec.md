# ProductChoiceApp Web版 仕様書

## 概要
商品選択実験のWebアプリケーション。
被験者がランダムな順序で商品を提示され、各商品の選択肢から1つを選ぶ実験システム。

## 技術スタック
- **フロントエンド**: React (Vite)
- **バックエンド**: FastAPI (Python)
- **データ保存**: Google Sheets API（CSVダウンロードも可）
- **デプロイ**: Render

---

## 画面構成

### 画面1：セットアップ画面（Setup）
- 被験者IDの入力欄（数値のみ）
- Startボタン
- バリデーション：IDが未入力または0の場合エラーメッセージを表示

### 画面2：実験画面（Experiment）
- 右上に進捗表示（例：`Product 3 / 7`）
- 左上に商品カテゴリ名を表示
- 中央に選択肢ボタンを表示（グリッドレイアウト）
- 選択肢ボタンには以下を表示：
  - 選択肢名
  - 属性1（例：価格）
  - 属性2（例：品質スコア）

### 画面3：終了画面（Finish）
- 「実験が終了しました」メッセージ
- 結果保存完了の通知

---

## 商品データ（game_library）

| ID | カテゴリ名 | 選択肢数 | 属性1 | 属性2 |
|----|-----------|---------|-------|-------|
| 1 | Smartphone Selection | 3 | Price_Dollar | QualityScore_Point |
| 2 | High-performance Laptop | 4 | Price_Dollar | RAM_GB |
| 3 | Mirrorless Camera | 5 | Price_Dollar | Resolution_MP |
| 4 | Wireless Headphones | 3 | Price_Dollar | NC_Level_Hour |
| 5 | Electric Vehicle (EV) | 4 | Price_Dollar | Range_km |
| 6 | Luxury Wristwatch Selection | 8 | Price_Dollar | DurabilityScore_Point |
| 7 | Investment Fund Portfolio | 10 | RiskLevel_Point | ExpectedReturn_Percent |

### 属性の表示形式
| 属性名 | 表示形式 |
|--------|---------|
| Price_Dollar | `価格: ¥{値}` |
| QualityScore_Point | `品質スコア: {値} 点` |
| RAM_GB | `RAM: {値} GB` |
| Resolution_MP | `解像度: {値} MP` |
| NC_Level_Hour | `NCレベル: {値} 時間` |
| Range_km | `航続距離: {値} km` |
| DurabilityScore_Point | `耐久性スコア: {値} 点` |
| RiskLevel_Point | `リスクレベル: {値} 点` |
| ExpectedReturn_Percent | `期待収益率: {値} %` |

---

## 実験ロジック

### ランダム化
- **商品の提示順序**：全商品をランダムに並び替えて提示
- **選択肢の表示順序**：各商品内の選択肢もランダムに並び替えて表示

### 反応時間の計測
- 各商品が表示された瞬間から、ボタンが押されるまでの時間（秒）を計測

### データ記録（1行 = 1試行）
| カラム名 | 内容 |
|---------|------|
| StudentID | 被験者ID |
| Trial | 試行番号（1〜7） |
| ProblemID | 商品ID（ランダム化前の元のID） |
| SelectedOptionID | 選択された選択肢の元のインデックス |
| SelectedOptionName | 選択された選択肢の名前 |
| ReactionTime | 反応時間（秒） |

---

## ボタンレイアウト

選択肢数に応じて自動的にグリッドを調整：
- 最大3列
- 行数 = ceil(選択肢数 / 3)
- パディング：20px、間隔：20px
- 例：3肢→1行3列、4肢→2行2列、8肢→3行3列（最終行2列）

---

## バックエンドAPI（FastAPI）

### エンドポイント

#### `GET /api/products`
全商品データを返す

**レスポンス例：**
```json
[
  {
    "id": 1,
    "name": "Smartphone Selection",
    "choices": [
      {
        "id": 1,
        "name": "Model A (Standard)",
        "attributes": {
          "Price_Dollar": 1000,
          "QualityScore_Point": 80
        }
      }
    ]
  }
]
```

#### `POST /api/results`
実験結果を1件保存する

**リクエスト例：**
```json
{
  "student_id": "123",
  "trial": 1,
  "problem_id": 4,
  "selected_option_id": 2,
  "selected_option_name": "Brand H2",
  "reaction_time": 3.45
}
```

#### `GET /api/results/{student_id}`
特定の被験者の結果をCSVでダウンロード

---

## データ保存先

### Google Sheetsへの保存
- スプレッドシート名：`ProductChoiceResults`
- シート名：`Results`
- 1行目：ヘッダー行（StudentID, Trial, ProblemID, SelectedOptionID, SelectedOptionName, ReactionTime, Timestamp）
- 2行目以降：実験データ

---

## フロントエンド構成（React）

```
src/
├── App.jsx              # メインコンポーネント・画面切り替え
├── components/
│   ├── SetupScreen.jsx  # セットアップ画面
│   ├── ExperimentScreen.jsx  # 実験画面
│   ├── FinishScreen.jsx # 終了画面
│   └── OptionButton.jsx # 選択肢ボタン
├── hooks/
│   └── useTimer.js      # 反応時間計測
└── api/
    └── client.js        # FastAPIとの通信
```

---

## バックエンド構成（FastAPI）

```
backend/
├── main.py              # FastAPIアプリ本体
├── data/
│   └── products.py      # 商品データ定義
├── models/
│   └── result.py        # データモデル
├── services/
│   └── sheets.py        # Google Sheets連携
└── requirements.txt
```

---

## 環境変数（.env）

```
GOOGLE_SHEETS_CREDENTIALS=（サービスアカウントJSON）
SPREADSHEET_ID=（スプレッドシートのID）
```

---

## Claude Codeへの指示文

以下をそのままClaude Codeのテキストボックスに貼り付けて使用：

```
この仕様書（ProductChoiceApp_spec.md）に従って、
商品選択実験のWebアプリを作成してください。

フォルダ構成：
- frontend/（React + Vite）
- backend/（FastAPI）

まずbackendから作成し、次にfrontendを作成してください。
Google Sheets連携は後回しにして、
まず動作確認できる状態を作ってください。
```
