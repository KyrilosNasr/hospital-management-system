import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { DoctorDetails } from '../interfaces/doctor';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

   constructor( private af: AngularFirestore) { }

  addDoctor(doctor: DoctorDetails){
    doctor.id = this.af.createId();
    return this.af.collection<any>("Doctors/").add(doctor);
  }

  getAllDoctors(): Observable<DocumentChangeAction<DoctorDetails>[]> {
    return this.af.collection<DoctorDetails>('/Doctors').snapshotChanges();
  }
}
