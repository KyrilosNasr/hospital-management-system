import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { PatientDetails } from '../interfaces/patient-details.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private afs: AngularFirestore) { }

  addPatient(patient: PatientDetails): Promise<DocumentReference<PatientDetails>> {
    patient.patientId = this.afs.createId();
    return this.afs.collection<PatientDetails>("Patients/").add(patient);
  }

}
