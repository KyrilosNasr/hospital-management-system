import { DoctorDetails } from './../../interfaces/doctor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { DoctorService } from '../../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'mobile', 'email','gender', 'department','actions'];
  dataSource!: MatTableDataSource<DoctorDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  doctorsList!:DoctorDetails[];
  constructor ( public dialog: MatDialog, 
    private doctorService: DoctorService,
    private _snackBar: MatSnackBar ){
      // this.getAllDoctors();
    }

    ngOnInit(){
      this.getAllDoctors();
      // console.log(this.formData, 'on init');
      
    }
  addDoctor(){
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = '50%';
    dialogconfig.height = '50%';
  
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;

    dialogconfig.data = {
      title:'add new doctor'
    }
    const dialogRef = this.dialog.open(AddDoctorComponent,dialogconfig);

    dialogRef.afterClosed().subscribe((data: DoctorDetails) => {
      if(data){
        this.doctorService.addDoctor(data);
        this.openSnackBar("New Doctor Added","OK")
      }
    })

  };

  getAllDoctors(){
    this.doctorService.getAllDoctors().subscribe((data)=>{
      this.doctorsList = data.map(e =>{
        const dataList = e.payload.doc.data();
        dataList.id = e.payload.doc.id;
        return dataList;
      }) ;  
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
