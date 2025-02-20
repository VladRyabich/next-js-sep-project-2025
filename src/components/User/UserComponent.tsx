import {IUser} from "@/models/IUser";
import {FC} from "react";
import Link from "next/link";
import './userStyle.css';

type userPropsType = {
    user:IUser;
}

const UserComponent:FC<userPropsType> = ({user}) => {
    return (
            <li className='userItem'>
                <Link href={`/users/${user.id}`}>

                    <img src={user.image} alt={user.lastName}/>

                    <h2>{user.id}. {user.firstName} {user.lastName}</h2>

                    <p>Age: {user.age}</p>

                </Link>
            </li>
    );
};

export default UserComponent;