import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorDetails } from '../../interfaces/doctor-details.interface';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit , OnDestroy {

  doctorDetails!:DoctorDetails | undefined;
  doctorId!:string | null;
  doctorSub!:Subscription;
  constructor(private router:ActivatedRoute,
    private doctorService:DoctorService)
    {
    this.router.paramMap.subscribe((d)=>
    this.doctorId = d.get('id'))
  }

  ngOnInit(){
    if(this.doctorId !== '' || null){
      this.getDoctorDetails(this.doctorId)
    }
  }
  getDoctorDetails(doctorId:string | null){
   this.doctorSub = this.doctorService.getDoctorDetails(doctorId).subscribe(
      (data:DoctorDetails|undefined) => {
        if(data){
        this.doctorDetails = data
      }
      }
    )
  }
  ngOnDestroy(): void {
  this.doctorSub.unsubscribe();  
  }
}
