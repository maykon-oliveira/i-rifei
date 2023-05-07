import { type NextPage } from 'next';
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'
import { api } from "~/utils/trpc";
import { CreateRaffleInput } from '~/server/schema/raffle';
import RaffleTable from '~/components/raffle/raffle-table';

const RaffleNew: NextPage = () => {
    const router = useRouter()
    const { handleSubmit, register, control } = useForm<CreateRaffleInput>({
        defaultValues: {
            name: 'Um kimono',
            description: 'Rifa de um kimono X',
            drawDay: new Date(),
            size: 5
        }
    })
    const raffleData = useWatch({ control });

    const { mutate, error } = api.raffle.create.useMutation({
        onSuccess: () => {
            router.push('/raffles')
        },
    })

    function onSubmit(values: CreateRaffleInput) {
        console.log(values);

        // mutate(values)
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
                <div className="w-full lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 my-auto">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Criar Nova Rifa</h2>
                    <form onSubmit={handleSubmit(data => onSubmit(data))} action="">
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Titulo</label>
                            <input {...register("name")} id="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="description" className="leading-7 text-sm text-gray-600">Descrição</label>
                            <textarea {...register("description")} id="description" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="drawDay" className="leading-7 text-sm text-gray-600">Dia do Sorteio</label>
                            <input type='datetime-local' {...register("drawDay")} id="drawDay" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="price" className="leading-7 text-sm text-gray-600">Preço</label>
                            <input type='number' {...register("price")} id="price" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="size" className="leading-7 text-sm text-gray-00">Quantidade de Números</label>
                            <input min={2} max={10} type='number' {...register("size")} id="size" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button type='submit' className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Criar</button>
                    </form>
                </div>

                <div className="w-full mt-5 md:w-1/2 bg-green-100 rounded-lg p-6 flex flex-col md:ml-auto md:mt-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900 break-all">{raffleData.name}</h1>
                    <p className="leading-relaxed mt-4 break-all">{raffleData.description}</p>
                    <span className="ext-2xl text-gray-900">R$ {raffleData.price}</span>

                    <RaffleTable size={raffleData.size || 9} />
                </div>
            </div>
        </section>
    )
}

export default RaffleNew;