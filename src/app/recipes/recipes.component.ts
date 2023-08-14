import {Component, OnInit} from '@angular/core';
import {Recipe} from "./Recipe.model";
import {RecipeService} from "./recipe.serveice";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{
  constructor(private recipService : RecipeService) {}
  selectedRecipe : Recipe;

  ngOnInit(): void {
    this.recipService.recipeSelected.subscribe(
      (recipe:Recipe)=>{
        this.selectedRecipe = recipe;
      }
    )
  }
}
