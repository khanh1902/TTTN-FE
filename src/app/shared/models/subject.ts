
export class Subject {
    subjectId: number;
    subjectName: string;
    credit: number;
    countStudents: number;

    constructor(subjectId: number, subjectName: string, credit: number, countStudents: number) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.credit = credit;
        this.countStudents = countStudents;
    }
}

export class AddSubjectByClass {
    classId: number[];

    constructor(classId: number[]) {
        this.classId = classId;
    }
}

export class AddSubjectByStudent {
    studentId: string[];

    constructor(studentId: string[]) {
        this.studentId = studentId;
    }
}