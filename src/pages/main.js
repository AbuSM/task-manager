import React, {useCallback} from 'react';
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
    Select,
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
        value: 0
    },
    {
        label: 'Не выполнена, отредактирована админом',
        value: 1
    },
    {
        label: 'Выполнена',
        value: 10
    },
    {
        label: 'Выполнена и отредактирована админом',
        value: 11
    }
];

export default function Main() {
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.loginReducer);
    console.log(logged);
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
        },
        {
            property: 'id',
            header: <Button primary label="Создать задачу"
                            onClick={() => dispatch({type: ACTION_MODAL, payload: {show: true}})}/>,
            sortable: false,
            render: data => <Button secondary={true} color="yellow" label="Редактировать задачу"
                                    onClick={() => dispatch({
                                        type: ACTION_MODAL,
                                        payload: {show: true, edit: true, data}
                                    })}/>
        },

    ];

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

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = data => console.log(data);

    const handleSubmit = data => {
        const {value} = data;
        if (state.modal.edit) {
            editTask(value, state.modal.data.id).then(() => {
                fetchData();
            });
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
                            <Form onSubmit={handleSubmit} errors={state.errors} onChange={handleChange}>
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
                                    <TextInput type="text" name="text" value={state.modal?.data?.text}/>
                                </FormField>
                                {state.modal.edit &&
                                <FormField label="Статус задачи" name="status">
                                    <Select options={statuses}
                                            labelKey="label"
                                            valueKey={{key: 'value', reduce: true}}
                                            defaultValue={state.modal?.data?.status}
                                            type="select" name="status"/>
                                </FormField>
                                }
                                <Box direction="row" gap="medium" justify="center">
                                    <Button type="reset" label="Отмена" onClick={handleCloseModal}/>
                                    <Button type="submit" primary label={state.modal.edit ? 'Редактировать' : 'Создать'}/>
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
