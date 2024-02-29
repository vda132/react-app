export interface SearchResult<T> {
    results: T[];
    totalItems: number;
    itemsPerPage: number;
}