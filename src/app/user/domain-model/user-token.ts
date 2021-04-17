export class UserToken {
    constructor(
        public tokenString: string,
        public email: string,
        public expireTimestamp: number,
        public issuer: string
    ) {
    }
}
