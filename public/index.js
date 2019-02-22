'use strict';

function displayRecipes(){
    $.getJSON('http://localhost:8080/recipes', recipes =>{
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
                        <section role="region" class="editRecipePopup">
                            <form class="editRecipeForm">
                                <h3 class="editRecipeFormTitle">Create new recipe</h3>
                                <label for="name" class="recipeNameLabel">Recipe name</label>
                                <input type="text" value="${recipes[i].name}" name="name" class="editRecipeName" required>
                        
                                <label for="info" class="recipeInfoLabel">Recipe info</label>
                                <input type="text" value="${recipes[i].info}" name="info" class="editRecipeInfo" required>
                        
                                <label for="ingredients" class="recipeIngredientsLabel">Ingredients</label>
                                <input type="text" value="${displayIngredients(ingredients)}" name="ingredients" class="editRecipeIngredients" required>
                                <button type="button" class="addIngredient">Add Ingredient</button>
                        
                                <label for="directions" class="recipeDirectionsLabel">Directions</label>
                                <input type="text" value="${displayDirections(directions)}" name="directions" class="newRecipeDirections" required>
                                <button type="button" class="addDirection">Add Step</button>
        
                                <button type="submit" class="submitEditRecipe">Save</button>
                                <button type="button" class="cancelEditRecipe">Cancel</button>
                            </form>
                        </section>
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
        url: 'http://localhost:8080/recipes',
        data: JSON.stringify(recipe),
        success: displayRecipes,
        dataType: 'json',
        contentType: 'application/json'
    });
}

function deleteRecipe(){
    $('.recipeContainer').on('click', '.deleteRecipeButton', function(){
        let recipeId = $(this).parent().find('.recipeId').text();
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:8080/recipes/${recipeId}`,
            success: displayRecipes,
            dataType: 'json',
            contentType: 'application/json'
        });
    });
}

function toggleEditPopup(){
    $('.recipeContainer').on('click', '.editRecipeButton', function(){
        $(this).parent().find('.editRecipePopup').toggleClass('show');
    })
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
    toggleEditPopup();
})