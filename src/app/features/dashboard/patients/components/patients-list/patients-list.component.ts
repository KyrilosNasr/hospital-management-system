import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { PatientsService } from '../../services/patients.service';
import { PatientDetails } from '../../interfaces/patient-details.interface';
import { DataService } from '../../../services/data.service';
import { Birthdate } from '../../../doctors/interfaces/doctor-details.interface';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent {

  displayedColumns: string[] = ['name', 'mobile', 'doctor', 'gender', 'approvalDate', 'prescription', 'actions'];
  dataSource!: MatTableDataSource<PatientDetails>;
  patientsList: PatientDetails[] = [];

  doctorsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formmatedDate!: Date;

  constructor(public dialog: MatDialog,
    private patientsService: PatientsService,
    private dataService:DataService,
    private _snackBar: MatSnackBar) {
    this.getAllPatients()
  }

  ngOnInit() {
  }

  public getAllPatients(){
    this.dataService.getAllPatients().subscribe(d=>{
      this.patientsList = d.map(x=>{
      let data = x.payload.doc.data();
      data.patientId = x.payload.doc.id;
      return data
    })
      this.dataSource = new MatTableDataSource(this.patientsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    )
  }

  public addPatient() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = '50%';
    dialogconfig.height = '50%';

    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;

    dialogconfig.data = {
      title : 'Add New Patient',
      buttonName : ' Add '
    }
    const dialogRef = this.dialog.open(AddPatientComponent, dialogconfig);

    dialogRef.afterClosed().subscribe((data: PatientDetails) => {
      if (data) {
        this.patientsService.addPatient(data);
        this.openSnackBar("New Patient Added", "OK")
      }
    })

  };
  
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewPatient(patient:PatientDetails) {
    window.open('/dashboard/doctor/doctor-details/' + patient.patientId, '_blank')
  }

  editPatient(patient: PatientDetails) {
    // window.open('/dashboard/doctor/doctor-details/' + patient.patientId, '_blank')
  }

  deletePatient(patient: PatientDetails) {
    // window.open('/dashboard/doctor/doctor-details/' + patient.patientId)
  }

  convertToDate(timestamp: Birthdate | Date): Date {
    if (typeof timestamp === 'object' && 'seconds' in timestamp && 'nanoseconds' in timestamp) {
      const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
      return this.formmatedDate = new Date(milliseconds);
    } else {
      return timestamp as Date;
    }
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnDestroy() {
    this.doctorsSub.unsubscribe();
  }
  
}
