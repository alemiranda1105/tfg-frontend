
export interface NewContentInterface {
    title: string;
    text: string;
}

export interface ContentInterface extends NewContentInterface {
    id: string;
}