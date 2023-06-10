import { DoctorDetails } from '../../interfaces/doctor-details.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { DoctorService } from '../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'mobile', 'email', 'gender', 'department', 'actions'];
  dataSource!: MatTableDataSource<DoctorDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  doctorsList:DoctorDetails[] = [];
  constructor ( public dialog: MatDialog, 
    private doctorService: DoctorService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar ){
      // this.getAllDoctors();
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
    const dialogRef = this.dialog.open(AddDoctorComponent,dialogconfig);

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
    const dialogRef = this.dialog.open(AddDoctorComponent,dialogconfig);

    dialogRef.afterClosed().subscribe((data: DoctorDetails) => {
      if(data){
        this.doctorService.updateDoctor(data);
        this.openSnackBar("Doctor Details Updated successfully!","OK")
      }
    })

  };

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((data)=>{
      this.doctorsList = data
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
 
}
