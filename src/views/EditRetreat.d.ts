import { CategoryType } from "../types";
type EditRetreatProps = {
    flashMessage: (message: string | null, category: CategoryType | null) => void;
};
export default function EditRetreat({ flashMessage }: EditRetreatProps): import("react/jsx-runtime").JSX.Element;
export {};
