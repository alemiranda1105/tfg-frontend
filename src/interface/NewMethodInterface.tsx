import { Results } from "./MethodInterface";


export interface NewMethodInterface {
    info: string;
    link: string;
    name: string;
    user_id: string;
    private: boolean;
    anonymous: boolean;
    results: [] | Results;
}
