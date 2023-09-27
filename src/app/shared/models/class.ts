import { SelectableData } from "src/app/core/tables/tables.component";

export interface IClass extends SelectableData {
    classId: number;
    className: string;
    schoolYear: string;
    isSelected: boolean;
}