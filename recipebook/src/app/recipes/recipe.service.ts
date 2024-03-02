import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Shrimp Salad',
      'I seafood, I eat it',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Recipe.jpg/714px-Recipe.jpg?20170213105318',
      [new Ingredient('shrimp', 8), new Ingredient('green onion', 2)]
    ),
    new Recipe(
      'Waldorf Salad',
      'Try it with curry flavor',
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Waldorf_Salad_%28Aunt_Caroline%27s_recipe%29.jpg',
      [new Ingredient('apple', 2), new Ingredient('walnut', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
