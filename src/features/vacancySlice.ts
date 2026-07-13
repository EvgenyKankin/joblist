import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type VacancyState = {
    vacancy: VacancyDetails | null;
    isLoading: boolean;
    error: string | null;
    isNotFound: boolean;
};

const initialState: VacancyState = {
    vacancy: null,
    isLoading: false,
    error: null,
    isNotFound: false,
};

export const fetchVacancy = createAsyncThunk<
    VacancyDetails,
    string,
    { rejectValue: string }
>('vacancy/fetchVacancy', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `https://kata-jobs.onrender.com/api/jobs/${id}`
        );

        if (response.status === 404) {
            return rejectWithValue('NOT_FOUND');
        }

        if (!response.ok) {
        throw new Error();
        }

        const data = await response.json();
        return data.job;
    } catch {
        return rejectWithValue('ERROR');
    }
});

const vacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVacancy.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.isNotFound = false;
        })
        .addCase(fetchVacancy.fulfilled, (state, action) => {
            state.isLoading = false;
            state.vacancy = action.payload;
        })
        .addCase(fetchVacancy.rejected, (state, action) => {
            state.isLoading = false;

            if (action.payload === 'NOT_FOUND') {
            state.isNotFound = true;
            } else {
            state.error = 'Не удалось загрузить вакансию';
            }
        });
    },
});

export default vacancySlice.reducer;