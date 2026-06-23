import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {Vacancy} from '../components/VacancyCard/VacancyCard'
import type { RootState } from './store';

type VacanciesState = {
  vacancys: Vacancy[];
  isLoading: boolean;
  error: string | null;
};

const initialState: VacanciesState = {
  vacancys: [],
  isLoading: false,
  error: null,
};

export const selectVacancysState = (state: RootState) => state.vacancies;

export const fetchVacancies = createAsyncThunk<
  Vacancy[],
  void,
  { rejectValue: string }
>('vacancies/fetchVacancies', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://kata-jobs.onrender.com/api/jobs');

    if (!response.ok) {
      return rejectWithValue('Ошибка загрузки вакансий');
    }

    return await response.json();
  } catch {
    return rejectWithValue('Ошибка сети');
  }
});

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
        state.vacancys = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export default vacanciesSlice.reducer;