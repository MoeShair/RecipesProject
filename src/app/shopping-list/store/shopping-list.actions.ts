import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/Ingredient.model";


export const addIngredient = createAction(
  '[shoppingList] Add Ingredient',
  props<{ingredient: Ingredient}>()
);
export const addIngredients = createAction(
  '[shoppingList] Add Ingredients',
  props<{ingredients: Ingredient[]}>()
);
export const updateIngredient = createAction(
  '[shoppingList] Update Ingredient',
  props<{index: number, ingredient: Ingredient}>()
);
export const deleteIngredient = createAction(
  '[shoppingList] delete Ingredient',
  props<{index: number}>()
);
export const StartEdit = createAction(
  '[Shopping List] Start Edit',
  props<{ index: number }>()
);

export const StopEdit = createAction(
  '[Shopping List] Stop Edit'
);

