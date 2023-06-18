import { MatDialogConfigs } from "src/app/shared/interfaces/mat-dialog-configs";

export interface PatientDetails {
    patientName: string;
    patientId: string;
    mobile: string;
    doctorId: string;
    doctorName: string;
    gender: string;
    approvalDate: string;
    prescription: string;
    dialogDetails?: MatDialogConfigs
}
