'use strict';

function displayRecipes(){
    $.getJSON('http://localhost:8080/recipes', recipes =>{
        for(let i = 0; i < recipes.length; i++){
            const ingredients = recipes[i].ingredients;
            const directions = recipes[i].directions;
            $('.recipeContainer').append(
                `
                <section role="region" class="recipe" >
                    <button class="accordion">
                        <h3 class="recipeName">${recipes[i].name}</h3>
                        <p class="recipeInfo">${recipes[i].info}</p>
                    </button>
                    <section role="region" class="panel">
                        <button type="button" class="editRecipeButton">Edit Recipe</button>
                        <h3>Ingredients</h3>
                        <ul class="ingredientsList">
                            ${displayIngredients(ingredients)}
                        </ul>
                        <h3>Directions</h3>
                        <ol class="directionsList">
                            ${displayDirections(directions)}
                        </ol>
                    </section>
                </section>
                `
            );
        }
    })
}

function accordion(){
    $('.recipeContainer').on('click', '.accordion', function(){
        $(this).toggleClass('clicked');
        $(this).parent().find('.panel').toggleClass('active');
    });
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
    accordion();
})