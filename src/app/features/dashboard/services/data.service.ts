import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DoctorDetails } from '../doctors/interfaces/doctor-details.interface';
import { PatientDetails } from '../patients/interfaces/patient-details.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }

  getAllDoctors(): Observable<DocumentChangeAction<DoctorDetails>[]> {
    return this.afs.collection<DoctorDetails>('/Doctors').snapshotChanges();
  }

  getAllPatients(): Observable<DocumentChangeAction<PatientDetails>[]> {
    return this.afs.collection<PatientDetails>('/Patients').snapshotChanges();
  }
}
