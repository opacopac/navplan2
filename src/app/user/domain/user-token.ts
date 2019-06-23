export interface UserToken {
    tokenString: string;
    email: string;
    expireTimestamp: number;
    issuer: string;
}
