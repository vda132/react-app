import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const userState = (state: InitialState) => state.user;

const user = createSelector(userState, state => state.user);
const userId = createSelector(userState, state => state.user?.id);
const userName = createSelector(userState, state => state.user?.userName);
const email = createSelector(userState, state => state.user?.email);
const roles= createSelector(userState, (state) => state.user?.roles);

export const userSelectors = {
    user,
    userId,
    userName,
    email,
    roles
};