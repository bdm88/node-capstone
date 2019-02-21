'use strict';

function displayRecipes(){
    $.getJSON('/recipes', recipes =>{
        console.log(recipes.length);
        let allRecipes = '';
        for(let i = 0; i < recipes.length; i++){
            const ingredients = recipes[i].ingredients;
            const directions = recipes[i].directions;
            allRecipes +=
                `
                <section role="region" class="recipe" >
                    <button class="accordion">
                        <h3 class="recipeName">${recipes[i].name}</h3>
                        <p class="recipeInfo">${recipes[i].info}</p>
                    </button>
                    <section role="region" class="panel">
                        <button type="button" class="editRecipeButton">Edit Recipe</button>
                        <button type="button" class="deleteRecipeButton">Delete Recipe</button>
                        <p class="recipeId">${recipes[i]._id}</p>
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
            ;
        }
        $('.recipeContainer').html(allRecipes);
    })
}

function accordion(){
    $('.recipeContainer').on('click', '.accordion', function(){
        $(this).toggleClass('clicked');
        $(this).parent().find('.panel').toggleClass('active');
    });
}

function displayIngredients(ingredients){
    let list = '';
    for(let i = 0; i < ingredients.length; i++){
        list += `<li>${ingredients[i]}</li>`;
    }
    return list;
}

function displayDirections(directions){
    let list = '';
    for(let i = 0; i < directions.length; i++){
        list += `<li>${directions[i]}</li>`;
    }
    return list;
}

function createRecipeButton(){
    $('.newRecipeButton').on('click', function(){
        $('.newRecipeFormContainer').css('display', 'block');
    })
}

function cancelRecipeButton(){
    $('.cancelRecipe').on('click', function(){
        $('.newRecipeFormContainer').css('display', 'none');
    })
}

function addIngredient(){
    $('.addIngredient').on('click', function(){
        $('.addIngredient').before('<input type="text" name="ingredients" class="newRecipeIngredients" required>')
    })
}

function addDirection(){
    $('.addDirection').on('click', function(){
        $('.addDirection').before('<input type="text" name="directions" class="newRecipeDirections" required>')
    })
}

function watchNewForm(){
    $('.newRecipeForm').submit(event =>{
        event.preventDefault();
        let ingredientsList = [];
        let directionsList = [];

        $('.newRecipeIngredients').each(function(){
            ingredientsList.push($(this).val())
        });

        $('.newRecipeDirections').each(function(){
            directionsList.push($(this).val())
        });
        createRecipe({
            name: $('input.newRecipeName').val(),
            info: $('input.newRecipeInfo').val(),
            ingredients: ingredientsList,
            directions: directionsList
        });
        $('.newRecipeFormContainer').css('display', 'none');
    });
}

function createRecipe(recipe){
    $.ajax({
        method: 'POST',
        url: '/recipes',
        data: JSON.stringify(recipe),
        success: displayRecipes,
        dataType: 'json',
        contentType: 'application/json'
    });
}

function deleteRecipe(){
    $('.recipeContainer').on('click', '.deleteRecipeButton', function(){
        console.log('delete recipe clicked');
        let recipeId = $(this).parent().find('.recipeId').text();
        console.log(recipeId);
        $.ajax({
            method: 'DELETE',
            url: `/recipes/${recipeId}`,
            success: displayRecipes,
            dataType: 'json',
            contentType: 'application/json'
        });
    });
}

$(function(){
    displayRecipes();
    accordion();
    createRecipeButton();
    cancelRecipeButton();
    watchNewForm();
    addIngredient();
    addDirection();
    deleteRecipe();
})