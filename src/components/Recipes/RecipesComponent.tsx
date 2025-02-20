import { apiService } from "@/services/api.services";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import RecipeComponent from "@/components/Recipe/RecipeComponent";
import SearchComponent from "@/components/Search/SearchComponent";
import './recipesStyle.css';

interface RecipesProps {
    searchParams: Promise<{ page?: string; query?: string; tag?: string }>;
}

const RecipesComponent = async ({ searchParams }: RecipesProps) => {
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || "1", 10);
    const query = sp.query || "";
    const tag = sp.tag || ""; // Отримуємо тег
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    let data;

    if (tag) {
        data = await apiService.getRecipesByTag(tag, skip, limit);
    } else if (query) {
        const parsedQuery = Number(query);
        if (!isNaN(parsedQuery)) {
            const singleRecipe = await apiService.getRecipe(parsedQuery);
            data = { recipes: [singleRecipe], total: 1 };
        } else {
            data = await apiService.getRecipes(skip, limit, query);
        }
    } else {
        data = await apiService.getRecipes(skip, limit);
    }

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <section>
            <SearchComponent />
            {query && <h2>Results for: {query}</h2>}
            {tag && <h2>Filtered by tag: {tag}</h2>}
            <ul className={'recipesList'}>
                {data.recipes.map((recipe) => <RecipeComponent key={recipe.id} recipe={recipe} />)}
            </ul>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
};

export default RecipesComponent;