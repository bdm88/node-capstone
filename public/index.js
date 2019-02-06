'use strict';

function displayRecipes(){
    $.getJSON('/recipes', recipes =>{
        for(let i = 0; i < recipes.length; i++){
            const ingredients = recipes[i].ingredients;
            const directions = recipes[i].directions;
            $('.recipeContainer').append(
                `
                <section role="region" class="recipe" >
                    <button type="button" class="editRecipeButton">Edit Recipe</button>
                    <h3 class="recipeName">${recipes[i].name}</h3>
                    <p class="recipeInfo">${recipes[i].info}</p>
                    <ul class="ingredientsList">
                        ${displayIngredients(ingredients)}
                    </ul>
                    <ol class="directionsList">
                        ${displayDirections(directions)}
                    </ol>
                </section>
                `
            );
        }
    })
}

function displayIngredients(ingredients){
    console.log(ingredients);
    let list = '';
    for(let i = 0; i < ingredients.length; i++){
        list += `<li>${ingredients[i]}</li>`;
    }
    return list;
}

function displayDirections(directions){
    console.log(directions);
    let list = '';
    for(let i = 0; i < directions.length; i++){
        list += `<li>${directions[i]}</li>`;
    }
    return list;
}

$(function(){
    displayRecipes();
})