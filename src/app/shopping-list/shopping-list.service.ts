import {Ingredient} from "../shared/Ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{
  ingredientChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('banana', 7)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
