import { GET_USERS, SET_SELECTED_USER } from "redux/constants/Users";

export function getUsers(users) {
    return {
        type: GET_USERS,
        users,
    };
}
export function setSelectedUser(user) {
    return {
        type: SET_SELECTED_USER,
        user,
    };
}
