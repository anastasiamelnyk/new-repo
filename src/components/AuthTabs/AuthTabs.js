import Tabs from "../UI/Tabs/Tabs";
import {useMemo, useState} from "react";
import classes from "./AuthTabs.module.scss"
import LoginForm from "../LoginForm/LoginForm";
import SigninForm from "../SigninForm/SigninForm";
import Button from "../UI/Button/Button";

const AuthTabs = () => {
    const AUTH_TABS = [
        {value: 'login', displayValue: 'Log in'},
        {value: 'signin', displayValue: 'Sign in'}
    ];
    const [currentTab, setCurrentTab] = useState({value: 'login', displayValue: 'Log in'});

    const isLogin = useMemo(() => currentTab.value === 'login', [currentTab]);

    const renderAuthForm = () => isLogin ? <LoginForm/> : <SigninForm/>;

    const renderFormTip = () => {
        return (
            <div className={classes['form-tip']}>
                {isLogin ? "Don't have an account yet? " : "Have an account already? "}
                <Button
                    variant="linkStyled"
                    clicked={() => setCurrentTab(AUTH_TABS.find(tab => tab.value !== currentTab.value))}
                >
                    {isLogin ? "Sing in" : "Log in"}
                </Button>
                &nbsp;here
            </div>
        );
    }

    return (
        <div className={classes['container']}>
            <Tabs
                options={AUTH_TABS}
                keysToDisplay={['displayValue']}
                variant="horizontal"
                value={currentTab}
                setValue={setCurrentTab}
            />
            <div className={classes['forms']}>
                {renderAuthForm()}
                {renderFormTip()}
            </div>
        </div>
    );
};

export default AuthTabs;