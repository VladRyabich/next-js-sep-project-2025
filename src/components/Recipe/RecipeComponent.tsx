import React from "react";
import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";
import RecipeByTagsComponent from "@/components/RecipeByTags/RecipeByTagsComponent";
import './recipeStyles.css';

interface IRecipeProps {
    recipe: IRecipe;
}


const RecipeComponent: React.FC<IRecipeProps> = ({ recipe }) => {
    return (
        <li className="recipeItem">
            <Link href={`/recipes/${recipe.id}`}>
                <h3>{recipe.id}. {recipe.name}</h3>

                <img className='recipesImg'
                     src={recipe.image}
                     alt={recipe.name}/>
            </Link>
            {recipe.tags.map((tag,index)=><RecipeByTagsComponent tag={tag} key={index}/>)}
        </li>
    );
};

export default RecipeComponent;