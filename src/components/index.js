import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Grommet, grommet, Header as HeaderLib, Menu} from 'grommet';
import {useSelector} from 'react-redux';

const AppWrapper = (props) => {
    const {logged} = useSelector(state => state.loginReducer);
    const history = useHistory();

    return (
        <Grommet theme={grommet}>
            <HeaderLib background="brand" justify="end" height="xxsmall" pad="medium">
                {!logged ?
                    <Button label="Login" onClick={() => history.push('/login')}/>
                    :
                    <Menu label = "account" items={[{label: 'logout'}]} />
                }
            </HeaderLib>
            {props.children}
        </Grommet>

    );
};


export {AppWrapper}
