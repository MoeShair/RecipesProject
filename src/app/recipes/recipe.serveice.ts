import {Recipe} from "./Recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/Ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  constructor(private shoppingListService: ShoppingListService) {}
  recipeSelected = new EventEmitter<Recipe>();
  private recipes :Recipe[] = [
    new Recipe('Test recipe', 'This is test recipe', `https://www.southernliving.com/thmb/jM1YjcVqzkt-Ej6pMp7qK--c_9Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg`,
      [new Ingredient('cheese',7),
        new Ingredient('meet',5)])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
