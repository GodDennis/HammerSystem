import { getUsers } from "redux/actions/Users";

const { usersApi } = require("usersApi/usersApi");

export const usersTC = () => async dispatch => {
    try {
        const res = await usersApi.getUsers();
        dispatch(getUsers(res.data));
    } catch (e) {}
};
