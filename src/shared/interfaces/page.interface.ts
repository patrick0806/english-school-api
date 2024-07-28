export interface IPage {
  page: number;
  pageSize: number;
}

export interface IPageResult<T> {
  content: T[];
  totalElements: number;
}
