import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';
import { DoctorDetails } from '../../interfaces/doctor-details.interface';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.scss']
})
export class DeleteDoctorComponent {

  doctorName!:string;
  title:string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DoctorDetails,
    public dialogRef: MatDialogRef<DeleteDoctorComponent>,
    private doctorService: DoctorService
  ){
    this.doctorName = data.name
    this.title = data.matDialogConfig?.title;
  }

  deleteDoctor(){
    this.dialogRef.close(this.data);
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
