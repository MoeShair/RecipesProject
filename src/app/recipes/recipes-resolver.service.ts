import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';



import { DataStorageService } from '../shared/data-storage.service';
import {Recipe} from "./Recipe.model";
import {RecipeService} from "./recipe.serveice";
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    console.log(recipes.length);

    if (recipes.length < 1) {
      return this.dataStorageService.fetchRecipes();
    } else {
      console.log(recipes[0].name) ;
      return recipes;
    }
  }
}

