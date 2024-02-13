import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Users from "./Users";
import Scheduler from "./Scheduler";

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    users: Users,
    scheduler: Scheduler,
});

export default reducers;
