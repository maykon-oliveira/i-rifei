import { type NextPage } from 'next';
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRaffleInput } from '~/server/schema/raffle';
import RaffleForm from '~/components/raffle/form/raffle-form';
import { IoTicketOutline } from 'react-icons/io5';
import StepperProvider from '~/utils/context/stepper';
import RaffleCard from '~/components/raffle/raffle-card';
import { format } from "date-fns";
import { BreadcrumbsContext } from '~/utils/context/breadcrumbs';
import { useContext, useEffect } from 'react';
import { rafflesRouter } from '~/utils/routes';

const RaffleNewPage: NextPage = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([rafflesRouter.list, rafflesRouter.new], []), []);

    const form = useForm<CreateRaffleInput>({
        shouldFocusError: true,
        resolver: zodResolver(CreateRaffleInput),
        defaultValues: {
            drawDate: format(new Date(), 'yyyy-MM-dd\'T\'hh:mm'),
            price: 0,
            size: 10,
            awards: [{ name: "" }]
        },
        mode: 'onBlur'
    })

    const formValue = useWatch({ control: form.control });
    const raffle = { ...formValue, drawDate: new Date(formValue.drawDate || ''), tickets: [] };

    return (
        <section className="flex flex-col xl:flex-row">
            <div className="flex items-center mb-5 xl:mb-0 xl:w-96 xl:mx-auto">
                <div className="flex card bg-base-300 mx-auto w-full max-w-lg">
                    <div className="card-body">
                        <StepperProvider>
                            <RaffleForm form={form} />
                        </StepperProvider>
                    </div>
                </div>
            </div>
            <div className="divider xl:divider-horizontal">
                <IoTicketOutline size={64} />
            </div>
            <div className="max-w-full mx-auto">
                <h1 className="text-1xl font-thin text-center mb-5">Pre-visualização</h1>
                <RaffleCard raffle={raffle as any} onTicketClick={() => { }} />
            </div>
        </section>
    )
}

export default RaffleNewPage;