export class Scores {
    studentId: string;
    studentName: string;
    subjectId: number;
    subjectName: string;
    className: string;
    scores: number;

    constructor(studentId: string, studentName: string, subjectId: number, subjectName: string, className: string, scores: number) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.className = className;
        this.scores = scores;
    }
}

export class ScoresDTO {
    scores: number;

    constructor(scores: number) {
        this.scores = scores;
    }
}

export class DeleteScoresDTO {
    studentId: string;
    subjectId: number;
    
    constructor(studentId: string, subjectId: number) {
        this.studentId = studentId;
        this.subjectId = subjectId;
    }
}

export class AverageScores {
    subjectName: string;
    averageScores: number;
    
    constructor(subjectName: string, averageScores: number) {
        this.subjectName = subjectName;
        this.averageScores = averageScores;
    }
}