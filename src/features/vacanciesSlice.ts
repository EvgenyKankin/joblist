import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type Vacancy = {
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

const initialState: VacanciesState = {
  vacancies: [],
  pagination: null,
  isLoading: false,
  error: null,
};

export const fetchVacancies = createAsyncThunk<
  JobsResponse,
  FetchVacanciesParams,
  { rejectValue: string }
>(
  'vacancies/fetchVacancies',
  async (
    { page, skills, search, city },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      params.set('page', String(page));

      if (search.trim()) {
        params.set('search', search.trim());
      }

      if (skills.length > 0) {
        params.set('skills', skills.join(','));
      }

      if (city !== 'Все города') {
        params.set('city', city);
      }

      const response = await fetch(
        `https://kata-jobs.onrender.com/api/jobs?${params.toString()}`
      );

      if (!response.ok) {
        return rejectWithValue('Ошибка загрузки вакансий');
      }

      return await response.json();
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vacancies = action.payload.jobs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const selectVacanciesState = (state: RootState) => state.vacancies;

export default vacanciesSlice.reducer;