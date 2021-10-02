import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openDropdown(event: any){
    console.log(event.target.tagName);
    //Checken of er niet geklikt is op een a of ul tag
    if (event.target.tagName != 'A' && event.target.tagName != 'UL'){
      //Checken of er niet geklikt is op een submenuitem
      if (!event.target.parentNode.parentNode.parentNode.parentNode.classList.contains('sidebar-submenu')){
        if (event.target.parentNode.parentNode.classList.contains('active')){
          event.target.parentNode.parentNode.classList.remove('active')
          $(event.target.parentNode.parentNode.children[1]).slideUp(200);

          //Icoontje veranderen van min naar pijltje
          event.target.parentNode.children[1].classList.add('hidden');
          event.target.parentNode.children[0].classList.remove('hidden');
        } else {
          event.target.parentNode.parentNode.classList.add('active')
          $(event.target.parentNode.parentNode.children[1]).slideDown(200);

          //Icoontje veranderen van pijltje naar min
          event.target.parentNode.children[0].classList.add('hidden');
          event.target.parentNode.children[1].classList.remove('hidden');
        }
      }
    }
  }

}
