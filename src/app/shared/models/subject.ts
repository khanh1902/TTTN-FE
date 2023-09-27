import { SelectableData } from "src/app/core/tables/tables.component";

export interface ISubject extends SelectableData {
    subjectId: number;
    subjectName: string;
    credit: number;
}