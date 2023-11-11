export class RankStudents {
    top: number;
    studentId: string;
    studentName: string;
    scores: number;

    constructor(top: number, studentId: string, studentName: string, scores: number) {
        this.top = top;
        this.studentId = studentId;
        this.studentName = studentName;
        this.scores = scores;
    }
}