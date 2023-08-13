import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/Ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static:false}) amountRef : ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(){
    this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value,
      this.amountRef.nativeElement.value));
  }
}
