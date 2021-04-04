import React from 'react';
import {Button, Grommet, grommet, Header as HeaderLib, Menu, RoutedButton} from 'grommet';
import {Icons} from 'grommet-icons/icons';


const AppWrapper = (props) => (
    <Grommet theme={grommet}>
        <HeaderLib background="brand">
            <RoutedButton label="Login" path="/login" />
            {/*<Button icon={<Icons.Home />} hoverIndicator />*/}
            <Menu label="account" items={[{ label: 'logout' }]} />
        </HeaderLib>
        {props.children}
    </Grommet>

);


export {AppWrapper}
