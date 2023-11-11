export interface Pagination<T> {
    offset: number;
    limit: number;
    count: number;
    content: T;
}
