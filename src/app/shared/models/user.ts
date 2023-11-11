import { Role } from "./role";

export class User{
    userId: string;
    username: string;
    fullName: string;
    email:string;
    roles: Role[];

    constructor(userId: string, username: string, fullName: string, email:string, roles: Role[]){
        this.userId = userId;
        this.username = userId;
        this.fullName = fullName;
        this.email = email;
        this.roles = roles;
    }

}


export class LoginRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class LoginResponse {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
}