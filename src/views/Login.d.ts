import { CategoryType, UserType } from "../types";
type LoginProps = {
    flashMessage: (newMessage: string, newCategory: CategoryType | null) => void;
    logUserIn: (user: UserType) => void;
};
export default function Login({ flashMessage, logUserIn }: LoginProps): import("react/jsx-runtime").JSX.Element;
export {};
