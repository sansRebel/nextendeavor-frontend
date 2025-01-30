export interface User{
    id: string;
    name: string;
    email: string;
};

export interface AuthResponse{
    token: string;
    user: User;
};

export interface Recommendation{
    id: string;
    name: string;
    description: string;
}