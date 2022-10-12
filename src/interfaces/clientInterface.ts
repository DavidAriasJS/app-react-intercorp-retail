interface IBirthday {
    seconds: number;
    nanoseconds: number;
}

export interface IClient {
    id?: string;
    firstName: string;
    lastName: string;
    birthday: IBirthday;
};