export interface User{
    id: string;
    name: string;
    email: string;
};

export interface AuthResponse{
    token: string;
    user: User;
};

export interface Recommendation {
    id: string;
    title: string; 
    description: string;
    requiredSkills: string[];
    industry: string | null;
    demand: number | null;
    growthPotential: number | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
    totalScore: number;
}
