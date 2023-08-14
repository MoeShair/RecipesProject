import {Component, OnInit} from '@angular/core';
import {Recipe} from "../Recipe.model";
import {RecipeService} from "../recipe.serveice";
import {ActivatedRoute, Params, Router} from "@angular/router";
//import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}
  recipe: Recipe;

  id: number;

  onAddToShoppingList(){
    /*for(let i = 0;i<this.recipe.ingredients.length; i++){
      this.shoppingListService.addIngredient(this.recipe.ingredients[i]);
    }*/
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
