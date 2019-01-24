'use strict';

const recipes = [
    {
        "name": "White Chocolate Raspberry Tart",
        "info": "Bite size tart crust, filled with white chocolate, and topped with raspberries."
    }
];

function displayRecipes(){
    for(let i = 0; i < recipes.length; i++){
        $('.recipeContainer').append(
            `
                <section role="region" class="recipe">
                    <img class="recipeImage" src="">
                    <button type="button" class="editRecipeButton">Edit Recipe</button>
                    <h3 class="recipeName">${recipes[i].name}</h3>
                    <p class="recipeInfo">${recipes[i].info}</p>
                </section>
                `
        )
    }
}

$(function(){
    displayRecipes();
})