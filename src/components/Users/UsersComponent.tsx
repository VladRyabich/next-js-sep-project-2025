import { apiService } from "@/services/api.services";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import UserComponent from "@/components/User/UserComponent";
import SearchComponent from "@/components/Search/SearchComponent";

interface UsersProps {
    searchParams: Promise<{ page?: string; query?: string }>;
}

const UsersComponent = async ({ searchParams }: UsersProps) => {
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || "1", 10);
    const query = sp.query || "";
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    let data;

    if (query) {
        const parsedQuery = Number(query);

        if (!isNaN(parsedQuery)) {
            // 🔹 Якщо query - ID, то шукаємо конкретного користувача
            const singleUser = await apiService.getUser(parsedQuery);
            data = { users: [singleUser], total: 1 }; // Обгортаємо в об'єкт
        } else {
            // 🔹 Інакше шукаємо за ім'ям
            data = await apiService.getUsers(skip, limit, query);
        }
    } else {
        // 🔹 Якщо немає пошуку, отримуємо всіх користувачів
        data = await apiService.getUsers(skip, limit);
    }

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <section>
            <SearchComponent />
            {query && <h2>Results for: {query}</h2>}
            <ul>
                {data.users.map((user) => <UserComponent key={user.id} user={user} />)}
            </ul>

            <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
};

    export default UsersComponent;