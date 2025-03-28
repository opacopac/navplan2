export const initialPaginatorState: PaginatorState = {
    pageSize: 10,
    currentPage: 1
};


export interface PaginatorState {
    pageSize: number;
    currentPage: number;
}
