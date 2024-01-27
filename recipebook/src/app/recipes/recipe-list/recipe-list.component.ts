import { Component, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() whichRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Testing the app', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Recipe.jpg/714px-Recipe.jpg?20170213105318'),
    new Recipe('Another Recipe', 'Testing the app', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Recipe.jpg/714px-Recipe.jpg?20170213105318')
  ];

  constructor() {}

  onRecipeSelected(recipe: Recipe) {
    this.whichRecipe.emit(recipe);
  }
}
