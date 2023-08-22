import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../../shared/Ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  StartEdit,
  StopEdit,
  updateIngredient
} from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient]
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients]
  })),
  on(updateIngredient, (state, action) => {
    const ingredient = state.ingredients[action.index];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null
    };

  }),
  on(deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ig, igIndex) => {
      return igIndex !== state.editedIngredientIndex;
    }),
    editedIngredientIndex: -1,
    editedIngredient: null

  })),
  on(StartEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: { ...state.ingredients[action.index] }
    };
  }),
  on(StopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  })

  );
