from pydantic import BaseModel


class ResultIn(BaseModel):
    student_id: str
    trial: int
    problem_id: int
    selected_option_id: int
    selected_option_name: str
    reaction_time: float


class ResultRecord(ResultIn):
    timestamp: str
