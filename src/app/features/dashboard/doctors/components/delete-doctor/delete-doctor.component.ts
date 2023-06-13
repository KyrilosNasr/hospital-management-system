import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../interfaces/doctor-details.interface';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.scss']
})
export class DeleteDoctorComponent {

  doctorName!:string;
  title!:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public dialogRef: MatDialogRef<DeleteDoctorComponent>,
    private doctorService: DoctorService
  ){
    this.doctorName = data.name
    this.title = data.title
  }

  deleteDoctor(){
    this.dialogRef.close(this.data);
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
