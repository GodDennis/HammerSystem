import axios from "axios";

const usersInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

export const usersApi = {
    getUsers: () => {
        return usersInstance.get("users");
    },
};
