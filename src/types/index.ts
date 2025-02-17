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
    careerId?: string;
    title: string; 
    description: string;
    requiredSkills: string[];
    industry: string | null;
    demand: number | null;
    growthPotential: number | null;
    salaryRange: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    totalScore: number;
    longDescription: string;
    savedAt: Date;
}

// export interface Career {
//     id: string;
//     title: string;
//     description: string;
//     longDescription: string;
//     requiredSkills: string[];
//     salaryRange: string;
//     industry: string;
//     demand: number;
//     growthPotential: number;
//   }
  
