import { OnInit, Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as $ from "jquery";
import { Subscription } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ListService } from '../list.service';
import { List } from '../list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Category[] = [];
  lists: Array<List> = [];
  categorySubscription$: Subscription = new Subscription();
  listSubscription$: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private listService: ListService) { }

  ngOnInit(): void {
    //Alle categorieen ophalen
    this.categorySubscription$ = this.categoryService.getCategories().subscribe(result =>
      {
        this.categories = result
        //Als alle categorieen opgehaald zijn, haal dan alle lijsten op
        this.listSubscription$ = this.listService.getLists().subscribe(result =>
        {
          this.lists = result;
        });
        this.allLists();
      });
  }

  NgOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
    this.listSubscription$.unsubscribe();
  }

  @Output()
  changedList: EventEmitter<any> = new EventEmitter();

  changeList(event: any, category: Category, singleList?: List) {
    if (event.target!.tagName != 'I'){
      this.changedList.emit({category, singleList});
    }
  }

  allLists() {
    var allCategories = true;
    this.changedList.emit({allCategories});
  }

  allImportantLists() {
    var allImportantCategories = true;
    this.changedList.emit({allImportantCategories});
  }

  allWeeklyLists() {
    var allWeeklyCategories = true;
    this.changedList.emit({allWeeklyCategories});
  }

  openDropdown(event: any){
    //Checken of er niet geklikt is op een a of ul tag
    if (event.target.tagName != 'A' && event.target.tagName != 'UL'){
      //Checken of er niet geklikt is op een submenuitem
      if (!event.target.parentNode.parentNode.parentNode.classList.contains('sidebar-submenu')){
        if (event.target.parentNode.parentNode.classList.contains('active')){
          event.target.parentNode.parentNode.classList.remove('active')
          $(event.target.parentNode.parentNode.parentNode.children[1]).slideUp(200);

          //Icoontje veranderen van min naar pijltje
          event.target.parentNode.children[1].classList.add('hidden');
          event.target.parentNode.children[0].classList.remove('hidden');
        } else {
          event.target.parentNode.parentNode.classList.add('active')
          $(event.target.parentNode.parentNode.parentNode.children[1]).slideDown(200);

          //Icoontje veranderen van pijltje naar min
          event.target.parentNode.children[0].classList.add('hidden');
          event.target.parentNode.children[1].classList.remove('hidden');
        }
      }
    }
  }
}
