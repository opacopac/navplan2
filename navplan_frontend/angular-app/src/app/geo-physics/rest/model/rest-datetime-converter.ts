export class RestDatetimeConverter {
    public static fromRest(restDateTime: string): Date {
        return restDateTime ? new Date(restDateTime) : undefined;
    }


    public static toRest(dateTime: Date): string {
        if (!dateTime) {
            return null;
        }

        return dateTime.toISOString();
    }
}
