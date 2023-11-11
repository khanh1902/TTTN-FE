export class Class {
    classId: number;
    className: string;
    schoolYear: string;
    countStudents: number;

    constructor(classId: number, className: string, schoolYear: string, countStudents: number) {
        this.classId = classId;
        this.className = className;
        this.schoolYear = schoolYear;
        this.countStudents = countStudents;
    }
}