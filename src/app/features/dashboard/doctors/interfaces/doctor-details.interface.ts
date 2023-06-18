import { MatDialogConfigs } from "src/app/shared/interfaces/mat-dialog-configs";

export interface DoctorDetails {
    id: string;
    name: string;
    mobile: string;
    gender: string;
    department: string;
    birthdate: Birthdate | Date;
    email: string;
    qualifications: string;
    matDialogConfig?:MatDialogConfigs
}

export interface Birthdate {
    seconds: number;
    nanoseconds: number;
}

