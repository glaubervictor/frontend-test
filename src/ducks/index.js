import { combineReducers } from "redux";

import PeopleReducer from "./people";
import StarshipsReducer from "./starships";

export default combineReducers({
    PeopleReducer,
    StarshipsReducer
});
