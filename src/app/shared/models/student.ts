
export class Student {
    studentId: string;
    studentName: string;
    studentAddress: string;
    className: string;

    constructor({studentId, studentName, studentAddress, className}: any){
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentAddress = studentAddress;
        this.className = className
    }
}