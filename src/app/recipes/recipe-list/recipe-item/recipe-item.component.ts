import {Component, Input} from '@angular/core';
import {Recipe} from "../../Recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() index: number;
  @Input() recipe : Recipe;

}
