import { UserType, CategoryType } from '../types';
export default function RetreatsPage({ isLoggedIn, currentUser, flashMessage }: {
    isLoggedIn: boolean;
    currentUser: UserType | null;
    flashMessage: (message: string, category: CategoryType) => void;
}): import("react/jsx-runtime").JSX.Element;
