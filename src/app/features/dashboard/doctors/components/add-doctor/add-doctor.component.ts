import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Birthdate, DoctorDetails, MatDialogData } from '../../interfaces/doctor-details.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  title !: string;
  buttonName!:string;
  addDoctorForm!: FormGroup;

  formmatedDate!:Date;
  name !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  department !: string;
  birthdate !: Birthdate | Date;
  qualifications !: string;
  id !: string;
  genderList = ['male', 'female'];
  departments : string[] = ['Orthopedics','Cardiology','Otorhinolaryngology','Ophthalmology','Psychiatry','Internal medicine','Radiology','Surgery','Pediatrics','Neurology','Urology','Anesthesiology','Nephrology','Neurosurgery','Gastroenterology','Pulmonology','General surgery','Intensive care medicine','Oncology','Pathology','Emergency medicine','Neonatology','Hematology','Pharmacy','Physical medicine and rehabilitation','Vascular surgery','Geriatrics','Gynaecology','Cardiac surgery','Outpatient department','Nuclear medicine','Infectious diseases','Clinical pathology','Intensive care unit','operating room','Casualty department']
  constructor(
    public dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    private datePipe: DatePipe,
    private fb: FormBuilder,
  ) {
    if(data){ 
      this.title = data.title;
      this.buttonName = data.buttonName;
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.mobile = data.mobile;
      this.gender = data.gender;
      this.birthdate = this.convertToDate(data.birthdate);
                 
      this.qualifications = data.qualifications;
      this.department = data.department;      
    }
  }
  
  ngOnInit() {
    this.FormInit();
    this.checkData();
  }

  FormInit() {
    this.addDoctorForm = this.fb.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      mobile: [this.mobile,[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      email: [this.email, [Validators.required, Validators.email]],
      gender: [this.gender, [Validators.required]],
      department: [this.department, [Validators.required]],
      birthdate: [this.birthdate, [Validators.required]],
      qualifications: [this.qualifications, [Validators.required]],
    });
  }

  get accessDoctorForm(): FormGroup {
    return this.addDoctorForm;
  }

  closeDialog() {
    // this.checkData()
    this.dialogRef.close();
  }
  
  checkData() {
    let control = this.accessDoctorForm.get('birthdate')?.value
    // const mobile = this.accessDoctorForm.get('birthdate')?.errors;
  }
  
  convertToDate(timestamp: Birthdate | Date): Date{
    if (typeof timestamp === 'object' && 'seconds' in timestamp && 'nanoseconds' in timestamp){
      const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
     return this.formmatedDate = new Date(milliseconds);    
    }else{
      return timestamp as Date;
    }
  }

  addDoctor() {    
    this.dialogRef.close(this.addDoctorForm.value);
  }
}
