export interface DoctorDetails {
    id: string;
    name: string;
    mobile: string;
    gender: string;
    department: string;
    birthdate: Birthdate | Date;
    email: string;
    qualifications: string;
}

export interface Birthdate {
    seconds: number;
    nanoseconds: number;
}

export interface MatDialogData extends DoctorDetails{
    title:string;
    buttonName:string;
}