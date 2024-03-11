import { CategoryType } from "../types";
type signUpProps = {
    flashMessage: (newMessage: string | null, newCategory: CategoryType | null) => void;
};
export default function SignUp({ flashMessage }: signUpProps): import("react/jsx-runtime").JSX.Element;
export {};
