export class StudentDTO{
    studentName: string;
    studentAddress: string;
    className: string;

    constructor(studentName: string, studentAddress: string, className: string){
        this.studentName = studentName;
        this.studentAddress = studentAddress;
        this.className = className
    }
}