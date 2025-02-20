import {FC} from "react";
import RecipeDetailsComponent from "@/components/RecipeDetails/RecipeDetailsComponent";

type RecipeProps = {
    params: Promise<{ id: string }>
}

const Page:FC<RecipeProps> = async ({params}) => {
    const {id} = await params;

    return (
        <div>
            <RecipeDetailsComponent id={Number(id)}/>
        </div>
    );
};

export default Page;