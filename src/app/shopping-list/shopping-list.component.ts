import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/Ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {StartEdit} from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromApp.AppState>) {
  }

  ingredients: Observable<{ingredients:Ingredient[]}>


  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe(
        (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        }
    );*/
  }

  ngOnDestroy() {
    //this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(StartEdit({index: index}));
  }
}
