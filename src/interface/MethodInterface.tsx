
export interface MethodInterface {
    id: string;
    info: string;
    link: string;
    name: string;
    user_id: string;
    private: boolean;
    results: Results;
}

export interface Results {
    f1_score: number;
    recall_score: number;
    precision_score: number;
}
