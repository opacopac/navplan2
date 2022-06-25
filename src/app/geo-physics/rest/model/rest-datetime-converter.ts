export class RestDatetimeConverter {
    public static fromRest(restDateTime: string): Date {
        return restDateTime ? new Date(restDateTime) : undefined;
    }
}
