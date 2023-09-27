export interface Pagination<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    content: T;
}
