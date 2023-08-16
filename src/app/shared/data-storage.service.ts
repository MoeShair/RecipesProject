import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.serveice";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/Recipe.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-course-recipe-book-54c7f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        , recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://ng-course-recipe-book-54c7f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}