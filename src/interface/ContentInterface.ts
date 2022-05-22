
export interface NewContentInterface {
    title: string;
    text: string;
    page: string;
}

export interface ContentInterface extends NewContentInterface {
    id: string;
}