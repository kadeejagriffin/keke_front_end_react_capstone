import { RetreatFormDataType, TokenType, UserFormDataType, UserType } from "../types";
import { RetreatType } from "../types";
type APIResponse<T> = {
    error?: string | undefined;
    data?: T | undefined;
};
declare function register(newUserData: UserFormDataType): Promise<APIResponse<UserType>>;
declare function login(username: string, password: string): Promise<APIResponse<TokenType>>;
declare function getMe(token: string): Promise<APIResponse<UserType>>;
declare function getRetreats(): Promise<APIResponse<RetreatType[]>>;
declare function createRetreat(token: string, newRetreatData: RetreatType): Promise<APIResponse<RetreatType>>;
declare function getRetreatById(retreatId: string): Promise<APIResponse<RetreatType>>;
declare function editRetreatbyId(token: string, retreatId: string | number, editRetreatData: RetreatFormDataType): Promise<APIResponse<RetreatType>>;
declare function deleteRetreatbyId(token: string, retreatId: string | number): Promise<APIResponse<string>>;
export { register, login, getMe, getRetreats, createRetreat, getRetreatById, editRetreatbyId, deleteRetreatbyId };
