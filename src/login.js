import React from 'react';
import {Grommet, Box, Form, FormField, TextInput, Text, Button} from 'grommet';
import {grommet} from 'grommet/themes';
import {login} from './api';

export default function Login() {
    const [value, setValue] = React.useState({ username: '', password: '' });

    const handleSubmit = (data) => {
        const {value} = data;
        console.log('data: ', data);
        login(value)
            .then(console.log)
    };

    return (
        <Grommet full theme={grommet}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form
                        value={value}
                        onChange={nextValue => setValue(nextValue)}
                        onSubmit={handleSubmit}
                    >
                        <FormField label="Логин" name="username" required>
                            <TextInput name="username" type="name" />
                        </FormField>

                        <FormField label="Пароль" name="password" required>
                            <TextInput name="password" type="password" />
                        </FormField>

                        {/*{message && (*/}
                        {/*    <Box pad={{ horizontal: 'small' }}>*/}
                        {/*        <Text color="status-error">{message}</Text>*/}
                        {/*    </Box>*/}
                        {/*)}*/}

                        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                            <Button type="submit" label="Войти" primary />
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
}
