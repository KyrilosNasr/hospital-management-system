import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  title!: string;
  addDoctorForm!: FormGroup;
  genderList = ['male', 'female'];
  departments : string[] = ['Orthopedics','Cardiology','Otorhinolaryngology','Ophthalmology','Psychiatry','Internal medicine','Radiology','Surgery','Pediatrics','Neurology','Urology','Anesthesiology','Nephrology','Neurosurgery','Gastroenterology','Pulmonology','General surgery','Intensive care medicine','Oncology','Pathology','Emergency medicine','Neonatology','Hematology','Pharmacy','Physical medicine and rehabilitation','Vascular surgery','Geriatrics','Gynaecology','Cardiac surgery','Outpatient department','Nuclear medicine','Infectious diseases','Clinical pathology','Intensive care unit','operating room','Casualty department']
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.title = data.title;
  }

  ngOnInit() {
    this.FormInit();
  }

  FormInit() {
    this.addDoctorForm = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
    });
  }

  get accessDoctorForm(): FormGroup<any> {
    return this.addDoctorForm;
  }

  closeDialog() {
    // this.checkData()
    this.dialogRef.close();
  }
  
  checkData() {
    // const mobile = this.accessDoctorForm.get('birthdate')?.errors;
    console.log(this.addDoctorForm);
  }

  addDoctor() {
    this.dialogRef.close(this.addDoctorForm.value);
  }
}
