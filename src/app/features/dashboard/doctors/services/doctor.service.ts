import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
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

  getAllDoctors(): Observable<DocumentChangeAction<DoctorDetails>[]> {
    return this.afs.collection<DoctorDetails>('/Doctors').snapshotChanges();
  }

  getDoctorDetails(doctorId: string | null): Observable<DoctorDetails | undefined>{
    return this.afs.doc<DoctorDetails>("Doctors/" + doctorId).valueChanges();
  }

  updateDoctor(doctor: DoctorDetails): Promise<void>{
    return this.afs.doc("Doctors/" + doctor.id).update(doctor);
  }

    deleteDoctor(id:string): Promise<void>{
   return this.afs.doc('/Doctors/'+id).delete();
  }
}
