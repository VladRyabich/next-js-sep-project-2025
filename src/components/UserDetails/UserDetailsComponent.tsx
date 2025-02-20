import {FC} from "react";
import {apiService} from "@/services/api.services";
import UserRecipesComponent from "@/components/UserRecipes/UserRecipesComponent";
import './userDetailsStyles.css';

type userProps = {
    id:number
}

const UserDetailsComponent:FC<userProps> = async ({id}) => {
    const user = await apiService.getUser(+id)
    return (
            <ul className={'userDetailsList'}>
                <li className={'userDetailsItem'}>
                    <h3 className={'infoTitle'}>{user.id}. {user.firstName} {user.lastName}</h3>
                </li>
                <li className={'userDetailsItem'}>
                    <img className={'userImg'} src={user.image} alt={user.lastName}/>
                </li>
                <li className={'userDetailsItem'}>
                    <h4 className={'userInfoTitle'}>Age:</h4>
                    <p className={'userInfoText'}>{user.age} years</p>
                </li>
                <li className={'userDetailsItem'}>
                    <h4 className={'user'}>Birth date:</h4>
                    <p className={'userInfoText'}>{user.birthDate}</p>
                </li>
                <li className={'userDetailsItem'}>
                    <h4 className={'userInfoTitle'}>Email:</h4>
                    <p className={'userInfoText'}>{user.email}</p>
                </li>
                <li className={'userDetailsItem'}>
                    <h4 className={'userInfoTitle'}>Phone:</h4>
                    <p className={'userInfoText'}>{user.phone}</p>
                </li>
                <li className={'userDetailsItem'}>
                    <h4 className={'userInfoTitle'}>University:</h4>
                    <p className={'userInfoText'}>{user.university}</p>
                </li>
                <li>
                    <h4>Recipes of this user:</h4>
                    <UserRecipesComponent userId={Number(id)}/>
                </li>
            </ul>
    );
};

export default UserDetailsComponent;