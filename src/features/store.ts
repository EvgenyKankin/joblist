import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './vacanciesSlice';
import vacancyReducer from './vacancySlice';

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    vacancy: vacancyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;