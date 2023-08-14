import {Component, Input, Output} from '@angular/core';
import {Recipe} from "../../Recipe.model";
import {RecipeService} from "../../recipe.serveice";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  constructor(private recipeService : RecipeService) {}

  @Input() recipe : Recipe;


  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
