import { type NextPage } from 'next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { api } from "~/utils/trpc";
import { type CreateUserInput } from '~/server/schema/user'

const Register: NextPage = () => {
    const router = useRouter()
    const { handleSubmit, register } = useForm<CreateUserInput>()

    const { mutate, error } = api.user.register.useMutation({
        onSuccess: async () => {
            await router.push('/login');
        },
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error?.message}
                <h1>Registrar</h1>

                <input
                    type="email"
                    placeholder="joao@gmail.com"
                    {...register('email')}
                />
                <br />
                <input type="text" placeholder="Tom" {...register('name')} />
                <button type="submit">Cadastrar</button>
            </form>

            <Link href="/login">Login</Link>
        </>
    )
}

export default Register;