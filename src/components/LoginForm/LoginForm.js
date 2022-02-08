import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const LoginForm = () => {
    const schema = yup.object({
        email: yup.string()
            .email('Please enter valid email following the example: "user@email.com"')
            .required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema) });

    const login = data => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(login)}>
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
            <Button fullWidth>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;