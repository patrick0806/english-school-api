export interface IPage<T> {
  totalPages: number;
  page: number;
  pageSize: number;
  content: T[];
}
