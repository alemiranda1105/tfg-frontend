
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
}

export interface Results {
    f1_score: number;
    recall_score: number;
    precision_score: number;
}

interface ResultByCategory {
    "1": Results
    "2": Results
    "3": Results
    "4": Results
    "5": Results
    "6": Results
    "7": Results
    "8": Results
    "9": Results
}
