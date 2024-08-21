export type FormattedApiResponse<T> =
  | { data: T; error?: never }
  | { data?: never; error: string };
