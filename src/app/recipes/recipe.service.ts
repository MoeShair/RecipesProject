import {Recipe} from "./Recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/Ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {addIngredients} from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer"

@Injectable()
export class RecipeService {
  recipesSubject = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromApp.AppState>) {
  }

  private recipes: Recipe[] =[]; //= [
  //   new Recipe('Test recipe', 'This is test recipe', `https://www.southernliving.com/thmb/jM1YjcVqzkt-Ej6pMp7qK--c_9Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg`,
  //     [new Ingredient('cheese', 7),
  //       new Ingredient('meet', 5)])
  // ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(addIngredients({ingredients:ingredients}))
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.recipesSubject.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesSubject.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesSubject.next(this.recipes.slice());
  }
}

