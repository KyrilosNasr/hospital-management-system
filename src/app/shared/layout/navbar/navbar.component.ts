import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentActive = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.getInitialRouteUrl()
  }

  //  
  getInitialRouteUrl(){
    this.currentActive = this.router.url
    
  }
  getCurrentACtiveLink(){
    let active = this.router.url
    
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationStart) {
        
    }
      if (event instanceof NavigationEnd) {
        this.currentActive = event.url;
      }
  })
      
  }
}
