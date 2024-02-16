import { useSelector } from "react-redux";
import { userSelectors } from "../user/store/user.selectors";

export const useAdmin = () => {
    const userRoles = useSelector(userSelectors.roles);
    const isAdmin = userRoles?.includes('admin') || userRoles?.includes('super-admin');

    return isAdmin;
}