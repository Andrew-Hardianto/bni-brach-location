export interface IPagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface IPaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: IPagination;
}

export interface ICabang {
    ID_Branch: number;
    Branch_Code: string;
    Branch_Name: string;
    Address: string;
    Region_Code: string;
    createdAt?: string;
    updatedAt?: string;
}

// Additional interfaces can be added here
