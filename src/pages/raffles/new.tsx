import { type NextPage } from 'next';
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRaffleInput } from '~/server/schema/raffle';
import RaffleTable from '~/components/raffle/raffle-table';
import { CurrencyBRLFormatter } from '~/components/input/currency';
import RaffleForm from '~/components/raffle/form/raffle-form';
import { IoTicketOutline } from 'react-icons/io5';
import StepperProvider from '~/utils/context/stepper';

const RaffleNew: NextPage = () => {
    const form = useForm<CreateRaffleInput>({
        shouldFocusError: true,
        resolver: zodResolver(CreateRaffleInput),
        defaultValues: {
            title: 'Rifa da Páscoa',
            description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos.',
            price: 2,
            size: 5,
            awards: [{ name: "" }]
        }
    })

    const formValue = useWatch({ control: form.control });

    return (
        <section className="flex flex-col lg:flex-row mx-auto py-10">
            <div className="flex card bg-base-300 lg:w-96">
                <div className="card-body">
                    <h1 className="card-title">Criar Nova Rifa</h1>
                    <StepperProvider>
                        <RaffleForm form={form} />
                    </StepperProvider>
                </div>
            </div>
            <div className="divider lg:divider-horizontal">
                <IoTicketOutline size={64} />
            </div>
            <div className="max-w-md sm:m-auto">
                <div className="card bg-base-300">
                    <div className="px-10 pt-10">
                        <RaffleTable size={formValue.size || 9} />
                    </div>
                    <div className="divider"></div>
                    <div className="card-body pt-0">
                        <h2 className="card-title break-all justify-between">
                            {formValue.title}
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