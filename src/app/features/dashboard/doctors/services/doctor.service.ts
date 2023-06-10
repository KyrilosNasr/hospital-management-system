import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { DoctorDetails } from '../interfaces/doctor-details.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

   constructor( private afs: AngularFirestore) { }

  addDoctor(doctor: DoctorDetails): Promise<DocumentReference<DoctorDetails>>{
    doctor.id = this.afs.createId();
    return this.afs.collection<DoctorDetails>("Doctors/").add(doctor);
  }

  getAllDoctors(): Observable<DoctorDetails[]> {
    return this.afs.collection<DoctorDetails>('/Doctors').valueChanges();
  }

  updateDoctor(doctor: DoctorDetails): Promise<void>{
    return this.afs.doc("Doctors/" + doctor.id).update(doctor);
  }

  deleteDoctor(doctorId:string): void{
    this.afs.doc("Doctors/" + doctorId).delete();
  }
}
