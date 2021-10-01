import { Component, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  ngAfterViewInit() {

  }

  title = 'todo';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggle_sidebar(){
    if (document.getElementById('page-wrapper')!.classList.contains("toggled")){
      document.getElementById('page-wrapper')!.classList.remove("toggled");
    } else {
      document.getElementById('page-wrapper')!.classList.add("toggled");
    }
  }
}
