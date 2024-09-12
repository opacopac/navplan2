export class AutoCompleteResultItem<T> {
    constructor(
        public item: T,
        public resultDisplayName: string,
        public selectedDisplayName: string
    ) {
    }
}
