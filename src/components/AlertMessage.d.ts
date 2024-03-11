import { CategoryType } from '../types';
type AlertMessageProps = {
    message: string | null;
    category: CategoryType | null;
    flashMessage: (newMessage: string | null, newCategory: CategoryType | null) => void;
};
export default function AlertMessage({ message, category, flashMessage }: AlertMessageProps): import("react/jsx-runtime").JSX.Element;
export {};
