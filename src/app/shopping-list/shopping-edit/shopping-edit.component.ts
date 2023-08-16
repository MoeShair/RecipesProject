import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";

import {NgForm} from "@angular/forms"
import {Ingredient} from "../../shared/Ingredient.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f', {static: false}) slForm: NgForm;
    subscription: Subscription;
    editedItemIndex: number;
    editMode = false;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing
            .subscribe(index => {
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.slForm.setValue({
                    'name': this.editedItem.name,
                    'amount': this.editedItem.amount
                })
            });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);

        } else {
            this.shoppingListService.addIngredient(newIngredient);

        }
        this.editMode = false;
        form.reset();
    }

    onClear(){
        this.editMode = false;
        this.slForm.reset();
    }
    onDelete(){
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
