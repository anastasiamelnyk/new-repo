import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import {useState} from "react";

const SigninForm = () => {
    const schema = yup.object({
        email: yup.string()
            .email('Please enter valid email following the example: "email@test.com"')
            .required('Email is required'),
        password: yup.string().required('Password is required'),
        repeatPassword: yup.string().required('Please repeat your password'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema) });

    const [passwordError, setPasswordError] = useState('');

    const signin = data => {
        const { password, repeatPassword } = data;
        if (password !== repeatPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordError('');
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(signin)}>
            <Input
                labelText="Email"
                register={register}
                inputId="email"
                errorText={errors.email?.message}
            />
            <Input
                labelText="Password"
                register={register}
                inputId="password"
                errorText={errors.password?.message}
            />
            <Input
                labelText="Repeat password"
                register={register}
                inputId="repeatPassword"
                errorText={errors.repeatPassword?.message || passwordError}
            />
            <Button fullWidth>
                Sign In
            </Button>
        </form>
    );
};

export default SigninForm;