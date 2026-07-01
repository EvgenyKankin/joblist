type Vacancy = {
  id: number;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  published_at: string;
  short_description: string;
  space: string;
  skills: string;
  experience: string;
};

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type JobsResponse = {
  success: boolean;
  pagination: Pagination;
  jobs: Vacancy[];
};

type VacanciesState = {
  vacancies: Vacancy[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
};

type FetchVacanciesParams = {
  page: number;
  skills: string[];
  search: string;
  city: string;
};