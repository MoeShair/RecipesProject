import {Component, Input} from '@angular/core';
import {Recipe} from "../Recipe.model";
import {RecipeService} from "../recipe.serveice";
//import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  constructor(private recipeService: RecipeService) {}
  @Input() recipe: Recipe;

  onAddToShoppingList(){
    /*for(let i = 0;i<this.recipe.ingredients.length; i++){
      this.shoppingListService.addIngredient(this.recipe.ingredients[i]);
    }*/
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
