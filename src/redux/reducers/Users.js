import { GET_USERS, SET_SELECTED_USER } from "../constants/Users";

const users = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS: {
            return { ...state, usersData: action.users };
        }
        case SET_SELECTED_USER: {
            return { ...state, selectedUser: action.user };
        }
        default:
            return state;
    }
};
export default users;
