import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";

import {NgForm} from "@angular/forms"
import {Ingredient} from "../../shared/Ingredient.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {addIngredient, deleteIngredient, StopEdit, updateIngredient} from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(updateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));

    } else {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(addIngredient({ingredient: newIngredient}));

    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(StopEdit());
  }

  onDelete() {
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(deleteIngredient({index: this.editedItemIndex}));
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(StopEdit());
  }
}
