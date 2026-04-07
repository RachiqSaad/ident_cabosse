export type Qualite = "B" | "C" | "D";

export interface FormData {
    numeroTC: string;
    reference: string;
    date: string;
    agent: string;
    qualite: Qualite;
}