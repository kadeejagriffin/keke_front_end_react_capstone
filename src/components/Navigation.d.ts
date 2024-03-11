import { UserType } from '../types';
type NavigationProps = {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserType | null;
};
export default function Navigation({ isLoggedIn, handleLogout }: NavigationProps): import("react/jsx-runtime").JSX.Element;
export {};
