import React from 'react';
import {Grommet, Box, Form, FormField, TextInput, Spinner, Button} from 'grommet';
import {grommet} from 'grommet/themes';
import {auth} from '../actions';
import {useDispatch, useSelector} from 'react-redux';


export default function Login({history}) {
    const {loading, error, logged} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        const {value} = data;
        dispatch(auth(value))
    };

    if (logged) {
        history.push('/')
    }

    return (
        <Grommet full theme={grommet}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form
                        onSubmit={handleSubmit}
                        errors={error}>
                        <FormField label="Логин" name="username">
                            <TextInput name="username" type="name"/>
                        </FormField>

                        <FormField label="Пароль" name="password">
                            <TextInput name="password" type="password"/>
                        </FormField>

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
