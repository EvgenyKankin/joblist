import classes from './JobList.module.css'
import styles from './VacanciesPagination.module.scss';
import { useEffect, useState } from 'react';
import { Pagination, Button, TextInput, Select, Loader } from '@mantine/core';
import { SkillsFilter } from '../SkillsFilter/SkillsFilter';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { fetchVacancies, selectVacanciesState } from '../../features/vacanciesSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

const initialSkills = ['JavaScript', 'React', 'Redux', 'Python'];

export const JobList = () => {
    const dispatch = useAppDispatch();
    const { vacancies, pagination, isLoading, error } = useAppSelector(selectVacanciesState);
    const [page, setPage] = useState(1);
    const [skills, setSkills] = useState(initialSkills);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('Все города');

    useEffect(() => {
        dispatch(fetchVacancies({ page, skills, search, city }));
    }, [dispatch, page, skills, search, city]);

    const handleSkillsChange = (newSkills: string[]) => {
        setSkills(newSkills);
        setPage(1);
    };

    if (error) return <p>{error}</p>;

    return (
        <div className={classes.joblistContainer}>
            {isLoading && (
            <div className={classes.loaderOverlay}>
                <Loader size="lg" />
            </div>
            )}
            <div className={classes.joblistContainer}>
                <div className={classes.titleContainer}>
                    <div className={classes.title}>
                        <p className={classes.listTitle}>Список вакансий</p>
                        <p className={classes.aboutTitle}>По профессии Frontend-разработчик</p>
                    </div>

                    <div className={classes.searchInput}>
                        <TextInput
                            className={classes.textInput}
                            placeholder="Должность или название компании"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.currentTarget.value)}
                            onKeyDown={(event) => {if (event.key === 'Enter') {setSearch(searchInput); setPage(1);}}}
                        />

                        <Button className={classes.searchButton}
                            onClick={() => {setSearch(searchInput); setPage(1);}}
                        >
                            Найти
                        </Button>
                    </div>
                </div>
                
                <div className={classes.decorLine}></div>
        
                <div className={classes.wrapper}>
                    <div className={classes.sideBar}>
                        <div className={classes.skillsBar}>                
                            <SkillsFilter
                                skills={skills}
                                onChange={handleSkillsChange}
                            />
                        </div>
                        <div className={classes.cityBar}>
                            <Select
                                className={classes.select}
                                value={city}
                                onChange={(value) => {setCity(value ?? 'Все города'); setPage(1);}}
                                data={['Все города', 'Москва', 'Санкт-Петербург',]}
                                styles={{
                                    input: {color: 'rgba(15, 15, 16, 0.3)',},
                                    option: {color: '#0f0f10',},
                                }}
                            />
                        </div>
                    </div>

                    <div className={classes.cardContainer}>
                        {vacancies.map((vacancy) => (
                            <VacancyCard
                                key={vacancy.id}
                                vacancy={vacancy}
                            />
                        ))}
                        <div className={classes.paginationWrapper}>
                            {pagination && (
                                <Pagination
                                    withEdges
                                    value={page}
                                    onChange={setPage}
                                    total={pagination.totalPages}
                                    siblings={1}
                                    boundaries={1}
                                    classNames={{
                                        root: styles.root,
                                        control: styles.control,
                                        dots: styles.dots,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;