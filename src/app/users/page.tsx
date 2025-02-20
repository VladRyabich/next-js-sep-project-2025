import UsersComponent from "@/components/Users/UsersComponent";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

const UsersPage = ({ searchParams }: PageProps) => {
    return (
        <div>
            <UsersComponent searchParams={searchParams} />
        </div>
    );
};

export default UsersPage;