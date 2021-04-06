import React, {useEffect, useCallback} from 'react';
import {
    Box,
    DataTable,
    Text,
    Button,
    Card,
    CardBody,
    Layer,
    Form,
    FormField,
    TextInput,
    Pagination,
    Spinner
} from 'grommet';
import {AppWrapper} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {createTask, editTask, getTasks} from '../api';
import {useToasts} from 'react-toast-notifications'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_COMPLETE,
    ACTION_MODAL,
    ACTION_PARAMS,
    ACTION_ERRORS
} from '../constants';

const statuses = [
    {
        label: 'Не выполнена',
        value: '0'
    },
    {
        label: 'Не выполнена, отредактирована админом',
        value: '1'
    },
    {
        label: 'Выполнена',
        value: '10'
    },
    {
        label: 'Выполнена и отредактирована админом',
        value: '11'
    }
];

export default function Main() {
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.loginReducer);
    const state = useSelector(state => state.mainReducer);
    const {addToast} = useToasts();

    const columns = [
        {
            property: 'username',
            header: <Text>Имя пользователя</Text>,
        },
        {
            property: 'email',
            header: 'Email',
        },
        {
            property: 'text',
            header: 'Текст задачи',
        },
        {
            property: 'status',
            header: 'Статус задачи',
            render: ({status}) => getStatus(status)
        },
        {
            property: 'id',
            header: <Button primary label="Создать задачу"
                            onClick={() => dispatch({type: ACTION_MODAL, payload: {show: true}})}/>,
            sortable: false,
            render: data => logged && <Button secondary={true} color="yellow" label="Редактировать задачу"
                                              onClick={() => dispatch({
                                                  type: ACTION_MODAL,
                                                  payload: {show: true, edit: true, data}
                                              })}/>
        },

    ];

    const getStatus = (status) => {
        if (logged && status === 0) {
            return statuses.filter(item => item.value === '10')[0].label
        }
        return statuses.filter(item => item.value === String(status))[0].label
    };

    const fetchData = useCallback(() => {
        dispatch({type: FETCH_DATA_REQUEST});
        getTasks(state.params)
            .then(res => {
                dispatch({
                    type: FETCH_DATA_COMPLETE,
                    payload: res
                })
            })
            .finally(() => FETCH_DATA_COMPLETE)
    }, [state.params, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = data => {
        let {value} = data;
        if (state.modal.edit) {
            if (logged) {
                value.status = 11
            }
            editTask(value, state.modal.data.id)
                .then(() => {
                    handleCloseModal();
                    addToast('Запись успешно обновлена!', {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    fetchData();
                })
                .catch(err => {
                    dispatch({type: ACTION_ERRORS, payload: err});
                    handleCloseModal();
                    addToast('Пожалуйста авторизуйтесь!', {
                        appearance: 'warning',
                        autoDismiss: true
                    });
                })
        } else {
            createTask(value)
                .then(res => {
                    handleCloseModal();
                    addToast('Операция прошла успешно!', {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    fetchData();
                })
                .catch(err => dispatch({type: ACTION_ERRORS, payload: err}))
        }
    };

    const handleCloseModal = () => dispatch({type: ACTION_MODAL, payload: {show: false}});

    const handleSort = props => (
        dispatch({
            type: ACTION_PARAMS,
            payload: {...state.params, sort_field: props.property, sort_direction: props.direction}
        })
    );

    const handlePage = ({page}) => (
        dispatch({type: ACTION_PARAMS, payload: {...state.params, page}})
    );


    return (
        <AppWrapper>
            <Box justify="center" pad="medium">
                {state.loading ?
                    <Spinner margin="0 auto" size="large"/> :
                    <Box>
                        <DataTable
                            columns={columns}
                            data={state.data?.tasks}
                            resizeable
                            primaryKey="id"
                            sortable
                            sort={{property: state.params.sort_field, direction: state.params.sort_direction}}
                            onSort={handleSort}
                        />
                        <Pagination numberItems={Number(state.data?.total_task_count)} margin="0 auto"
                                    onChange={handlePage}
                                    step={3}
                                    page={state.params.page}/>
                    </Box>
                }
                {state.modal.show &&
                <Layer
                    onEsc={handleCloseModal}
                    onClickOutside={handleCloseModal}>
                    <Card width="medium">
                        <CardBody pad="medium">
                            <Form onSubmit={handleSubmit} errors={state.errors}>
                                {!state.modal.edit &&
                                <React.Fragment>
                                    <FormField label="Имя пользователя" name="username">
                                        <TextInput type="text" name="username"/>
                                    </FormField>
                                    <FormField label="Email" name="email">
                                        <TextInput type="email" name="email"/>
                                    </FormField>
                                </React.Fragment>
                                }
                                <FormField label="Текст задачи" name="text">
                                    <TextInput type="text" name="text" defaultValue={state.modal?.data?.text}/>
                                </FormField>
                                <Box direction="row" gap="medium" justify="center">
                                    <Button type="reset" label="Отмена" onClick={handleCloseModal}/>
                                    <Button type="submit" primary
                                            label={state.modal.edit ? 'Редактировать' : 'Создать'}/>
                                </Box>
                            </Form>
                        </CardBody>
                    </Card>
                </Layer>
                }
            </Box>
        </AppWrapper>
    )
};
