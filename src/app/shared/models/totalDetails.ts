export class TotalDetails{
    totalStudents: number;
    totalClasses: number;
    totalSubjects: number;
    totalScores: number;

    constructor(totalStudents: number, totalClasses: number, totalSubjects: number, totalScores: number) {
        this.totalClasses = totalClasses;
        this.totalScores = totalScores;
        this.totalStudents = totalStudents;
        this.totalSubjects = totalSubjects;
    }
}