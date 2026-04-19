import csv
import io
import os
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from data.products import PRODUCTS
from models.result import ResultIn, ResultRecord
from services.sheets import save_to_sheets

app = FastAPI(title="ProductChoiceApp API")

_default_origins = "http://localhost:5173,http://127.0.0.1:5173"
_origins = os.getenv("CORS_ORIGINS", _default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memoryストレージ（Google Sheets連携まで）
_results: list[dict] = []


@app.get("/api/products")
def get_products():
    return PRODUCTS


@app.post("/api/results", status_code=201)
async def post_result(body: ResultIn):
    record = ResultRecord(
        **body.model_dump(),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    _results.append(record.model_dump())
    await save_to_sheets(record.model_dump())
    return {"status": "saved"}


@app.get("/api/results/{student_id}")
def get_results_csv(student_id: str):
    rows = [r for r in _results if r["student_id"] == student_id]
    if not rows:
        raise HTTPException(status_code=404, detail="No results found")

    output = io.StringIO()
    writer = csv.DictWriter(
        output,
        fieldnames=["student_id", "trial", "problem_id", "selected_option_id",
                    "selected_option_name", "reaction_time", "timestamp"],
    )
    writer.writeheader()
    writer.writerows(rows)

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=results_{student_id}.csv"},
    )
