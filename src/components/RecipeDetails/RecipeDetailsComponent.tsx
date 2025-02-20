import React, {FC} from 'react';
import {apiService} from "@/services/api.services";
import RecipeByTagsComponent from "@/components/RecipeByTags/RecipeByTagsComponent";
import './recipeDetailsStyles.css';

type RecipeDetailType = {
    id: number;
}
const RecipeDetailsComponent:FC<RecipeDetailType> = async ({id}) => {
    const recipe = await apiService.getRecipe(id);
    return (
            <ul className='recipeDetailsList'>
                <li className={'recipeDetailsItem recipeTitle'}>
                    <h2 className={'infoTitle'}>{recipe.id}. {recipe.name} </h2>
                </li>
                <li className={'recipeDetailsItem recipeImgItem'}>
                    <img className='recipeImg' src={recipe.image} alt={recipe.name}/>
                </li>
                <li className={'recipeDetailsItem'}>
                    {!(recipe.cookTimeMinutes === 0) &&
                        <p><span className={'recipeDetailsSubtitle recipeSpan'}>Cook time:</span>
                            {recipe.cookTimeMinutes} minutes
                        </p>}
                </li>
                <li className={'recipeDetailsItem'}>
                    {!(recipe.prepTimeMinutes === 0) &&
                        <p><span className={'recipeDetailsSubtitle recipeSpan'}>Prepare time:</span>
                            {recipe.prepTimeMinutes} minutes
                        </p>}
                </li>
                <li className={'recipeDetailsItem'}>
                    <h4>Difficulty:</h4>
                    <p>{recipe.difficulty}</p>
                </li>
                <li className={'recipeDetailsItem'}>
                    <h4>Instructions:</h4>
                    <p>{recipe.instructions}</p>
                </li>
                <li className={'recipeDetailsItem'}>
                    <h4>Cuisine:</h4>
                    <p>{recipe.cuisine}</p>
                </li>
                <li className={'recipeDetailsItem'}>
                    <h4>Calories:</h4>
                    <p>{recipe.caloriesPerServing}</p>
                </li>
                <li className='recipeDetailsItem recipeLinkByTagName'>
                    <h4>Tags:</h4>
                    {recipe.tags.map((tag, index) => <RecipeByTagsComponent tag={tag} key={index}/>)}
                </li>
            </ul>
    );
};

export default RecipeDetailsComponent;