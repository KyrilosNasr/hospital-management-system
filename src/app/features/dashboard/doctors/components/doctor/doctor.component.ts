import { DoctorDetails } from '../../interfaces/doctor-details.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDoctorComponent } from '../delete-doctor/delete-doctor.component';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'mobile', 'email', 'gender', 'department', 'actions'];
  dataSource!: MatTableDataSource<DoctorDetails>;
  doctorsList:DoctorDetails[] = [];

  doctorsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor ( public dialog: MatDialog, 
    private doctorService: DoctorService,
    private dataService:DataService,
    private router: Router,
    private _snackBar: MatSnackBar ){
    }

    ngOnInit(){
      this.getAllDoctors();     
    }


  addDoctor(){
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = '50%';
    dialogconfig.height = '50%';
  
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    
    dialogconfig.data = {
      title:'add new doctor'
    }
    dialogconfig.data.buttonName = ' ADD ';
    const dialogRef = this.dialog.open(DoctorFormComponent,dialogconfig);

    dialogRef.afterClosed().subscribe((data: DoctorDetails) => {
      if(data){
        this.doctorService.addDoctor(data);
        this.openSnackBar("New Doctor Added","OK")
      }
    })

  };

  editDoctor(row:DoctorDetails){
    if(row.id == null || row.name == null){
      return;
    }
        
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = '50%';
    dialogconfig.height = '50%';
  
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.data = row;
    dialogconfig.data.birthdate = row.birthdate;
    
    dialogconfig.data.title = "Edit Doctor";
    dialogconfig.data.buttonName = 'update';
    const dialogRef = this.dialog.open(DoctorFormComponent,dialogconfig);

    dialogRef.afterClosed().subscribe((data: DoctorDetails) => {
      if(data){
        this.doctorService.updateDoctor(data);
        this.openSnackBar("Doctor Details Updated successfully!","OK")
      }
    })

  };

  deleteDoctor(doctor: DoctorDetails) {
    if (doctor.id == null || doctor.name == null) {
      return;
    }
    
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = '20%';
    
    
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.data = doctor;
    dialogconfig.data.birthdate = doctor.birthdate;
    
    dialogconfig.data.title = "delete Doctor";
    dialogconfig.data.buttonName = 'delete';
    dialogconfig.data.doctorName = doctor.name;
    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogconfig);
    
    dialogRef.afterClosed().subscribe((data: DoctorDetails) => {
      if (data) {        
        this.doctorService.deleteDoctor(data.id)
        this.openSnackBar("Doctor " + data.name +" Deleted successfully!", "OK")
      }
    })

  };
  
  getAllDoctors(){
  this.doctorsSub = this.dataService.getAllDoctors().subscribe((data)=>{
      this.doctorsList = data.map((e)=>{
        let data = e.payload.doc.data();
        data.id= e.payload.doc.id;
        return data;        
      })      
      this.dataSource = new MatTableDataSource(this.doctorsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  viewDoctor(doctor:DoctorDetails){
    window.open('/dashboard/doctor/doctor-details/'+doctor.id,'_blank')
  }

  ngOnDestroy(){
    this.doctorsSub.unsubscribe();
  }
 
}
