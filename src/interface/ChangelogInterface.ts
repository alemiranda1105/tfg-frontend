
export interface NewChangelogInterface {
    date: string,
    description: string
}

export interface ChangelogInterface extends NewChangelogInterface {
    id: string,
}