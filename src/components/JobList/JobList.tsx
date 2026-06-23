import { useEffect } from 'react';
import classes from './Joblist.module.css';
import { fetchVacancies, selectVacancysState } from '../../features/vacanciesSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';


function JobList() {
  const dispatch = useAppDispatch();

  const { vacancys, isLoading, error } = useAppSelector(selectVacancysState);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  if (isLoading) {
    return (
      <p>Загрузка вакансий...</p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (<p>Вакансия</p>
    /*
    <div className={classes.cardContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>*/
  );
}

export default JobList;