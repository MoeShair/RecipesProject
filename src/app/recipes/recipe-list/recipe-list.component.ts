import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../Recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
    constructor(private recipesService: RecipeService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    recipes: Recipe[];
    subscription:Subscription


    ngOnInit(): void {
        this.subscription = this.recipesService.recipesSubject
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                }
            );
        this.recipes = this.recipesService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
