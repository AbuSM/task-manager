import React, {useState} from 'react';
import {Grommet, Box, Form, FormField, TextInput, Text, Spinner, Button} from 'grommet';
import {grommet} from 'grommet/themes';
import {auth} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Login() {
    const [value, setValue] = useState({username: '', password: ''});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const {loading, err} = useSelector(state => state.loginReducer);

    const handleSubmit = (data) => {
        const {value} = data;
        dispatch(auth(value)).then(res => {
            localStorage.setItem('token', res.token)
        });
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
                            <TextInput name="username" type="name"/>
                        </FormField>

                        <FormField label="Пароль" name="password" required>
                            <TextInput name="password" type="password"/>
                        </FormField>

                        {err && (
                            <Box pad={{ horizontal: 'small' }}>
                                <Text color="status-error">{err}</Text>
                            </Box>
                        )}

                        <Box direction="row" justify="center" margin={{top: 'medium'}}>
                            {loading ?
                                <Spinner/>
                                :
                                <Button type="submit" label="Войти" primary/>
                            }
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
}
