import classes from './JobList.module.css';
import styles from './VacanciesPagination.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Pagination, Button, TextInput, Tabs, Loader } from '@mantine/core';
import { SkillsFilter } from '../SkillsFilter/SkillsFilter';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import { fetchVacancies, selectVacanciesState } from '../../features/vacanciesSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

const initialSkills = ['JavaScript', 'React', 'Redux', 'Python'];

export const JobList = () => {
    const dispatch = useAppDispatch();
    const { vacancies, pagination, isLoading, error } =
        useAppSelector(selectVacanciesState);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = location.pathname.includes('petersburg')
    ? 'petersburg'
    : 'moscow';

    const city = activeTab === 'moscow' ? 'Москва' : 'Санкт-Петербург';
    const skills = useMemo(() => {
    const skillsParam = searchParams.get('skills');

        return skillsParam
        ? skillsParam.split(',').filter(Boolean)
        : initialSkills;
    }, [searchParams]);

    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        setSearchInput(search);}, [search]);

    useEffect(() => {
        dispatch(fetchVacancies({ page, skills, search, city }));
    }, [dispatch, page, skills, search, city]);

    const updateParams = (newParams: {
        page?: number;
        search?: string;
        skills?: string[];
        }) => {
            const nextPage = newParams.page ?? page;
            const nextSearch = newParams.search ?? search;
            const nextSkills = newParams.skills ?? skills;

            const params: Record<string, string> = {};

            if (nextPage !== 1) {
            params.page = String(nextPage);
            }

            if (nextSearch) {
            params.search = nextSearch;
            }

            if (nextSkills.length > 0) {
            params.skills = nextSkills.join(',');
            }

            setSearchParams(params);
        };

    const handleSearch = () => {
        updateParams({
            search: searchInput,
            page: 1,});
    };

    const handleSkillsChange = (newSkills: string[]) => {
        updateParams({
        skills: newSkills,
        page: 1,});
    };

    if (error) return <p>{error}</p>;

    return (
        <div className={classes.joblistContainer}>
        {isLoading && (
            <div className={classes.loaderOverlay}>
            <Loader size="lg" />
            </div>
        )}

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
                onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleSearch();
                }
                }}
            />

            <Button className={classes.searchButton} onClick={handleSearch}>
                Найти
            </Button>
            </div>
        </div>

        <div className={classes.decorLine}></div>

        <div className={classes.wrapper}>
            
            <div className={classes.sideBar}>
                <div className={classes.skillsBar}>
                    <SkillsFilter skills={skills} onChange={handleSkillsChange} />
                </div>
            </div>

            <div className={classes.cardContainer}>
                <div className={classes.cityBar}>
                    <Tabs
                        value={activeTab}
                        onChange={(value) => {
                            if (!value) return;

                            navigate({
                            pathname: `/vacancies/${value}`,
                            search: '',
                            });
                        }}
                    >
                    <Tabs.List>
                        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
                    </Tabs.List>
                    </Tabs>
                </div>
                {vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                ))}

                <div className={classes.paginationWrapper}>
                    {pagination && (
                    <Pagination
                        withEdges
                        value={page}
                        onChange={(newPage) => updateParams({ page: newPage })}
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
    );
};

export default JobList;