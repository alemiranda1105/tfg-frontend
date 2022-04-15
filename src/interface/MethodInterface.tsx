
export interface MethodInterface {
    id: string;
    info: string;
    link: string;
    source_code?: string;
    name: string;
    user_id: string;
    private: boolean;
    anonymous: boolean;
    results: Results;
    results_by_category: ResultByCategory;
    results_by_category_field: ResultByFieldCategory;
    results_by_field: ResultByField[];
}

export interface Results {
    [key: string]: number
}

export interface ResultByCategory {
    [key: string]: Results;
}

export interface ResultByField {
    name: string,
    results: Results
}

export interface ResultByFieldCategory {
    [key: string]: {
        [key: string]: ResultsV2[]
    }
}

export interface ResultsV2 {
    name: string
    result: number
}
