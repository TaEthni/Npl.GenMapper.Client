export interface TeamCreateDto {
    name: string;
}

export interface TeamUpdateDto {
    name: string;
    clearIShareApiKey: boolean;
    iShareApiKey: string | null;
}
