import { SelectableData } from "src/app/core/tables/tables.component";

export interface IStudent extends SelectableData {
    studentId: string;
    studentName: string;
    studentAddress: string;
    className: string;
}