import {FC} from "react";
import UserDetailsComponent from "@/components/UserDetails/UserDetailsComponent";

type userProps = {
    params:Promise<{id:string}>;
}

const Page:FC<userProps> = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            <UserDetailsComponent id={+id}/>
        </div>
    );
};

export default Page;