import { FC } from "react";
import Link from "next/link";

type RecipeTagsPropType = {
    tag: string;
};

const RecipeByTagsComponent: FC<RecipeTagsPropType> = ({ tag }) => {
    return (
        <div>
            <Link className={'LinkToTag'} href={`/recipes?tag=${tag}`}>
                {tag}
            </Link>
        </div>
    );
};

export default RecipeByTagsComponent;