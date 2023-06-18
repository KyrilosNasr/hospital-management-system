import { DoctorService } from './../../../doctors/services/doctor.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Birthdate } from '../../../doctors/interfaces/doctor-details.interface';
import { PatientDetails } from '../../interfaces/patient-details.interface';
import { MatDialogConfigs } from 'src/app/shared/interfaces/mat-dialog-configs';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit, OnDestroy {

  title !: string | undefined;
  buttonName!: string | undefined;

  addPatientForm!: FormGroup;
  formmatedDate!: Date;
  
  patientName !: string;
  patientId !: string;
  mobile !: string;
  gender !: string;
  doctorId !: string;
  doctorName !: string;
  approvalDate !: string;
  prescription !: string;
  doctorsList: { doctorName: string; doctorId: string;}[] = []; 
  genderList = ['male', 'female'];
  sub!:Subscription;
  constructor(public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogConfigs | PatientDetails,
    private fb: FormBuilder,
    private doctorService:DoctorService,
    private dataService:DataService
    ){
    if ('patientName' in data ) {      
      this.patientName = data.patientName;
      this.mobile = data.mobile;
      this.gender = data.gender;
      this.approvalDate = data.approvalDate;
      this.prescription = data.prescription;
      this.patientId = data.patientId;
      this.doctorId = data.doctorId;
      this.doctorName = data.doctorName;
    }else{
      this.title = data.title;
      this.buttonName = data.buttonName;
    }
}

  ngOnInit():void{
    this.getAllDoctors();
    this.patientFormBuid();
  }

  public registerPatient() {
    let docotrNameControl = this.patientFormAccess.controls['doctorName'];
    let doctorIdControl = this.patientFormAccess.controls['doctorId'];
    console.log(docotrNameControl.value);
    
    doctorIdControl.patchValue(docotrNameControl.value);
    let doctorName = this.getDoctorName(docotrNameControl.value)
    docotrNameControl.patchValue(doctorName)
    
  }
  
  public get validity(){
    return this.patientFormAccess.valid
    
  }
  public addPatient(){
    console.log(this.patientFormAccess.value);
    
    this.dialogRef.close(this.patientFormAccess.value);
  }


  public closDialog(){
    this.dialogRef.close();
  }



  private getAllDoctors() {
   this.sub =  this.dataService.getAllDoctors().subscribe(
      (dataList) => {
        this.doctorsList = dataList.map((e) => {
          let doctor = e.payload.doc.data();
          const doctorDetails = {
            doctorName: doctor.name,
            doctorId: e.payload.doc.id,
          }
          return doctorDetails
        })
      }
    )
  }

  private patientFormBuid() {
     this.addPatientForm = this.fb.group({
      patientId: [this.patientId, []],
      patientName: [this.patientName, Validators.required],
      mobile: [this.mobile, [Validators.required, Validators.maxLength(12), Validators.minLength(10)]],
      gender: [this.gender, Validators.required],
      doctorId: [this.doctorId, Validators.required],
      doctorName: [this.doctorName, []],
      approvalDate: [this.approvalDate, Validators.required],
      prescription: [this.prescription, Validators.required],
    })
  }  

  private getDoctorName(doctorId: string) : string {
    for (let i = 0; i < this.doctorsList.length; i++) {
      if (this.doctorsList[i].doctorId == doctorId) {
        return this.doctorsList[i].doctorName;
      }
    }
    return "";
  }
  
  private get patientFormAccess(): FormGroup {
    return this.addPatientForm
  }

  private convertToDate(timestamp: Birthdate | Date): Date {
    if (typeof timestamp === 'object' && 'seconds' in timestamp && 'nanoseconds' in timestamp) {
      const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
      return this.formmatedDate = new Date(milliseconds);
    } else {
      return timestamp as Date;
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
