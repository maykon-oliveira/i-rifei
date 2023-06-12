import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RaffleDrawnConfirmationModal from "~/components/modal/raffle-drawn-confirmation-modal";
import RaffleGrid from "~/components/raffle/raffle-grid";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { ModalContext } from "~/utils/context/modal";
import { rafflesRouter } from "~/utils/routes";
import { api } from "~/utils/trpc";

type Props = {

}

const RaffleDrawPage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { openModal, isOpen: modalIsOpen } = useContext(ModalContext);
    const router = useRouter();
    const { data: raffle, isLoading, error, refetch } = api.raffle.allDetails.useQuery({
        id: router.query.id as string
    });
    const { mutateAsync: startDrawn, isLoading: isDrawning } = api.raffle.startDrawn.useMutation();
    const [numbersHighlight, setNumbersHighlight] = useState(0);
    const [drawning, setDrawning] = useState(false);

    useEffect(() => {
        if (raffle) {
            setBreadcrumbs([rafflesRouter.list, rafflesRouter.view(raffle), rafflesRouter.draw(raffle)], []);
        }
    }, [raffle]);

    if (!raffle || isLoading) {
        return <h1>{error?.message}</h1>
    }

    const onStartDrawn = async () => {
        setDrawning(true);

        try {
            const { drawnTickets } = await startDrawn({ id: raffle.id });

            for (const drawnTicket of drawnTickets) {
                setNumbersHighlight(drawnTicket);
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            await refetch();
        } catch (e: any) {
            const error = e as Error;
            toast.error(error.message);
        }

        setDrawning(false);
    };

    const onDrawnConfirm = () => {
        openModal(<RaffleDrawnConfirmationModal raffle={raffle} />)
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-center">
                <h4 className="font-bold mb-2">Instruções</h4>
                <p className="text-sm">Ao clicar em Sortear, será escolhido aleatoriamente 1 número comprado da rifa.</p>
            </div>

            <div className="w-96 mx-auto my-10">
                <RaffleGrid size={raffle?.size} tickets={raffle.tickets} numberHighlight={numbersHighlight} />
            </div>

            {(!(drawning || raffle.winner)) && (
                <button disabled={isDrawning} onClick={onStartDrawn} className="btn btn-primary btn-wide">Sortear</button>
            )}

            {!!raffle.winner && (
                <div className="hero border-2">
                    <div className="hero-content text-center">
                        <div className="max-w-md flex flex-col">
                            <h3 className="text-3xl font-bold text-base-content/70">Temos um Ganhador!</h3>
                            <h2 className="text-2xl py-5 font-bold">{raffle.winner.name}</h2>
                            <div className="avatar justify-center pb-10">
                                <div className="w-24 rounded-full">
                                    <img alt={raffle.winner.name} src={raffle.winner.image ?? ''} referrerPolicy="no-referrer" />
                                </div>
                            </div>
                            <button disabled={modalIsOpen} onClick={onDrawnConfirm} className="btn btn-primary">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RaffleDrawPage;
