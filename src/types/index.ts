export type UserFormDataType = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light'

export type TokenType = {
    token: string,
    tokenExpiration: string
}

export type RetreatType = {
    id?: number;
    name: string;
    location: string;
    date: string;
    description: string;
    duration: string;
    cost: string;
    userId?: number
};

export type RetreatFormDataType = {
    name: string,
    description: string,
    location: string
    date: string,    
    duration: string,
    cost: string
}

export type APIResponse<T> = {
    error?: string | undefined;
    data?: T | undefined;
}

export type Retreat = {
    id: number;
    name: string;
};

export type RetreatFormProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newRetreat: RetreatType;
    handleFormSubmit: (e: React.FormEvent) => void;
};

export type RetreatCardProps = {
    retreat: RetreatType;
    currentUser: UserType|null
};

