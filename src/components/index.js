import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Grommet, grommet, Header as HeaderLib, Menu} from 'grommet';
import {useSelector, useDispatch} from 'react-redux';
import {checkToken, logout} from '../actions';

/**
 * Wrapper component for all others
 * @param props
 * @returns {*}
 * @constructor
 */
const AppWrapper = (props) => {
    const {logged} = useSelector(state => state.loginReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return (
        <Grommet theme={grommet}>
            <HeaderLib background="brand" justify="end" height="xxsmall" pad="medium">
                {!logged ?
                    <Button label="Login" onClick={() => history.push('/login')}/>
                    :
                    <Menu label = "account" items={[{label: 'logout', onClick: () => dispatch(logout())}]} />
                }
            </HeaderLib>
            {props.children}
        </Grommet>

    );
};


export {AppWrapper}
