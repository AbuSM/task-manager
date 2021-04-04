import React from 'react';
import {Grommet, Box, DataTable, Meter, Text} from 'grommet';
import {AppWrapper} from './components';
import {grommet} from 'grommet/themes';


export default function Main() {
    const columns = [
        {
            property: 'name',
            header: <Text>Имя пользователя</Text>,
            primary: true,
            footer: 'Total',
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

    ];

    const data = [
        {
            'id': 1,
            'username': 'Test User',
            'email': 'test_user_1@example.com',
            'text': 'Hello, world!',
            'status': 10,
        },
        {
            'id': 3,
            'username': 'Test User 2',
            'email': 'test_user_2@example.com',
            'text': 'Hello from user 2!',
            'status': 0,
        },
        {
            'id': 4,
            'username': 'Test User 3',
            'email': 'test_user_3@example.com',
            'text': 'Hello from user 3!',
            'status': 0,
        }
    ];

    return (
        <AppWrapper>
            <Box align="center" pad="large">
                {}
                <DataTable
                    columns={columns}
                    data={data}
                    resizeable='true'
                    sortable='true'
                    // step={10}
                    onClickRow={event => console.log(event.datum)}
                />
            </Box>
        </AppWrapper>
    )
};
