import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/Ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  constructor(private shoppingListService : ShoppingListService) {}
  @ViewChild('nameInput',{static:false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static:false}) amountRef : ElementRef;



  onAddItem(){
    /*this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value,
      this.amountRef.nativeElement.value));*/
    this.shoppingListService.addIngredient(new Ingredient(this.nameInputRef.nativeElement.value,
      this.amountRef.nativeElement.value));
  }
}
