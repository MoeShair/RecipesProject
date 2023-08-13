import { Component } from '@angular/core';
import {Ingredient} from "../shared/Ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('banana', 7)
  ];

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);

  }
}
