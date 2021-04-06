import React from 'react';
import {Box, DataTable, Text, Button, Card, CardBody, Layer, Form, FormField, TextInput} from 'grommet';
import {AppWrapper} from '../components';
import {useSelector} from 'react-redux';
import {createTask, editTask, getTasks} from '../api';

export default function Main() {
    const [data, setData] = React.useState([]);
    const [modal, setModal] = React.useState({show: false, edit: false});
    const {logged} = useSelector(state => state.loginReducer);


    const columns = [
        {
            property: 'username',
            header: <Text>Имя пользователя</Text>,
            primary: true,
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
            header: <Button primary label="Создать задачу" onClick={() => setModal({show: true})} key={0}/>,
            sortable: false,
            render: data => <Button secondary={true} color="yellow" label="Редактировать задачу"
                                    onClick={() => setModal({show: true, edit: true, data})}/>
        },

    ];

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        getTasks().then(res => {
            setData(res?.tasks);
        })
    };

    const data_ = [
        {
            'id': 1,
            'username': 'Test User',
            'email': 'test_user_1@example.com',
            'text': 'Hello, world!',
            'status': 10,
            key: 1
        },
        {
            'id': 3,
            'username': 'Test User 2',
            'email': 'test_user_2@example.com',
            'text': 'Hello from user 2!',
            'status': 0,
            key: 2
        },
        {
            'id': 4,
            'username': 'Test User 3',
            'email': 'test_user_3@example.com',
            'text': 'Hello from user 3!',
            'status': 0,
            key: 3
        }
    ];

    const handleSubmit = data => {
        const {value} = data;
        if (modal.edit) {
            editTask(value).then(() => {
                fetchData();
            });
        } else {
            createTask(value).then(res => {
                setData([...data, ...res])
            });
        }
    };

    const handleCloseModal = () => setModal({show: false});

    return (
        <AppWrapper>
            <Box justify="center" pad="medium">
                <DataTable
                    columns={columns}
                    data={data}
                    resizeable
                    sortable
                    step={3}
                    paginate
                />
                {modal.show &&
                <Layer
                    onEsc={handleCloseModal}
                    onClickOutside={handleCloseModal}>
                    <Card width="medium">
                        <CardBody pad="medium">
                            <Form onSubmit={handleSubmit}>
                                {!modal.edit &&
                                <React.Fragment>
                                    <FormField label="Имя пользователя" name="username" required>
                                        <TextInput type="text" name="username"/>
                                    </FormField>
                                    <FormField label="Email" name="email" required>
                                        <TextInput type="email" name="email"/>
                                    </FormField>
                                </React.Fragment>
                                }
                                <FormField label="Текст задачи" name="text" required>
                                    <TextInput type="text" name="text" value={modal?.data?.text}/>
                                </FormField>
                                {modal.edit &&
                                <FormField label="Статус задачи" name="status" required>
                                    <TextInput type="text" name="status" value={modal?.data?.status}/>
                                </FormField>
                                }
                                <Box direction="row" gap="medium" justify="center">
                                    <Button type="reset" label="Отмена" onClick={() => setModal(false)}/>
                                    <Button type="submit" primary label={modal.edit ? 'Редактировать' : 'Создать'}/>
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
