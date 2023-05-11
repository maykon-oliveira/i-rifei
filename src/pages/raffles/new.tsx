import { type NextPage } from 'next';
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/trpc";
import { CreateRaffleInput } from '~/server/schema/raffle';
import RaffleTable from '~/components/raffle/raffle-table';
import { CurrencyBRLInput, CurrencyBRLFormatter } from '~/components/input/currency';
import toast from "react-hot-toast";

const RaffleNew: NextPage = () => {
    const router = useRouter()
    const { mutate, isLoading } = api.raffle.create.useMutation();
    const { handleSubmit, register, control, formState } = useForm<CreateRaffleInput>({
        resolver: zodResolver(CreateRaffleInput),
        defaultValues: {
            name: 'Rifa da Páscoa',
            description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos.',
            price: 2,
            size: 5
        }
    })
    const formValue = useWatch({ control });

    function onSubmit(values: CreateRaffleInput) {
        mutate(values, {
            onSuccess(data) {
                toast.success(data);
                router.push('/me/raffles');
            },
            onError(error) {
                toast.error(error.message);
            },
        })
    }

    return (
        <section className="flex flex-col lg:flex-row mx-auto py-10">
            <div className="flex card bg-base-300 lg:w-96">
                <div className="card-body">
                    <h1 className="card-title">Criar Nova Rifa</h1>
                    <form onSubmit={handleSubmit(data => onSubmit(data))} action="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Título</span>
                            </label>
                            <input type="text" {...register("name")} className={`input input-bordered w-full ${formState.errors.name ? 'input-error' : 'input-primary'}`} />
                            <label className="label">
                                <span className="label-text-alt">{formState.errors.name?.message}</span>
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Descrição</span>
                            </label>
                            <textarea {...register("description")} className={`textarea h-24 ${formState.errors.description ? 'input-error' : 'textarea-primary'}`} />
                            <label className="label">
                                <span className="label-text-alt">{formState.errors.description?.message}</span>
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Data do Sorteio</span>
                            </label>
                            <input type="datetime-local" {...register("drawDay", { valueAsDate: true })} className={`input input-bordered w-full ${!formState.errors.drawDay ? 'input-primary' : 'input-error'}`} />
                            <label className="label">
                                <span className="label-text-alt">{formState.errors.drawDay?.message}</span>
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Preço</span>
                            </label>
                            <CurrencyBRLInput control={control} name="price" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Tamanho da Matriz</span>
                            </label>
                            <input type="number" min="2" max="10" {...register("size", { valueAsNumber: true })} className={`input input-bordered w-full ${formState.errors.size ? 'input-error' : 'input-primary'}`} />
                            <label className="label">
                                <span className="label-text-alt">{formState.errors.size?.message}</span>
                            </label>
                        </div>

                        <div className="card-actions justify-end">
                            <button disabled={isLoading} type='submit' className="btn btn-primary">Criar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="my-auto max-w-md">
                <div className="card bg-base-300">
                    <div className="px-10 pt-10">
                        <RaffleTable size={formValue.size || 9} />
                    </div>
                    <div className="divider"></div>
                    <div className="card-body pt-0">
                        <h2 className="card-title break-all justify-between">
                            {formValue.name}
                            <div className="badge badge-secondary">
                                <CurrencyBRLFormatter displayType="text" value={formValue.price} />
                            </div>
                        </h2>
                        <p className="leading-relaxed mt-4 break-all">{formValue.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RaffleNew;