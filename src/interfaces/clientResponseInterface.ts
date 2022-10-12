interface IBirthday {
    seconds: number;
    nanoseconds: number;
}

export interface IClientResponse {
    id?: string;
    firstName: string;
    lastName: string;
    birthday: IBirthday;
};