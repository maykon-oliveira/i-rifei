import { type NextPage } from 'next';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { api } from "~/utils/trpc";
import { CreateRaffleInput } from '~/server/schema/raffle';

const RaffleNew: NextPage = () => {
    const router = useRouter()
    const { handleSubmit, register } = useForm<CreateRaffleInput>()

    const { mutate, error } = api.raffle.create.useMutation({
        onSuccess: () => {
            router.push('/raffles')
        },
    })

    function onSubmit(values: CreateRaffleInput) {
        // mutate(values)
    }

    return (
        <>
            <h1>Nova Rifa</h1>
        </>
    )
}

export default RaffleNew;