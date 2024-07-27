export interface User {
    userId: string;
    userName: string;
}

export interface Room {
    [roomId: string]: User[];
}