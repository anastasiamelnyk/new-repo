import { useForm } from "react-hook-form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./LoginForm.module.scss";

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const login = data => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(login)} className={classes['form']}>
            <Input labelText="Email" register={register} inputId="email" />
            <Input labelText="Password" register={register} inputId="password" />
            <Button fullWidth>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;