import {Component, OnInit} from '@angular/core';
import {Recipe} from "../Recipe.model";
import {RecipeService} from "../recipe.serveice";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  constructor(private recipesService : RecipeService) {}
  recipes: Recipe[];


  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }
}
