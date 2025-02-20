import RecipesComponent from "@/components/Recipes/RecipesComponent";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

const RecipesPage = ({ searchParams }: PageProps) => {
    return (
        <div>
            <RecipesComponent searchParams={searchParams} />
        </div>
    );
};

export default RecipesPage;