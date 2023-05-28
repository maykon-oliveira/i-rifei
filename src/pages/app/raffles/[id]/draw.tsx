import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import RaffleTable from "~/components/raffle/raffle-table";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { rafflesRouter } from "~/utils/routes";
import { api } from "~/utils/trpc";

type Props = {

}

const RaffleDrawPage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const router = useRouter()
    const { data: raffle, isLoading, error } = api.raffle.allDetails.useQuery({
        id: router.query.id as string
    });
    const { mutateAsync: startDrawn } = api.raffle.startDrawn.useMutation();
    const [numbersHighlight, setNumbersHighlight] = useState(0);
    const [drawning, setDrawning] = useState(false);
    const [winner, setWinner] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        if (!!raffle) {
            setBreadcrumbs([rafflesRouter.list, rafflesRouter.view(raffle), rafflesRouter.draw(raffle)], []);
        }
    }, [raffle]);

    if (!raffle || isLoading) {
        return <h1>{error?.message}</h1>
    }

    const onStartDrawn = async () => {
        setDrawning(true);
        const { drawnNumbers, winner } = await startDrawn({ id: raffle.id });

        for (const drawnNumber of drawnNumbers) {
            setNumbersHighlight(drawnNumber);
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setWinner(winner);
        setDrawning(false);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="text-center">
                <h4 className="font-bold">Instruções</h4>
                <p className="text-sm">Ao clicar em Sortear, será escolhido aleatoriamente 10 números da rifa, o último será o sorteado.</p>
            </div>

            <div className="max-w-lg mx-auto my-10">
                <RaffleTable size={raffle?.size} tickets={raffle.tickets} numberHighlight={numbersHighlight} />
            </div>

            {(!(drawning || winner)) && (
                <button onClick={onStartDrawn} className="btn btn-primary btn-wide">Sortear</button>
            )}

            {!!winner && (
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h3 className="text-3xl font-bold text-base-content/70">Temos um Ganhador!</h3>
                            <h2 className="text-2xl py-10 font-bold">{winner.name}</h2>
                            <button className="btn btn-primary">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RaffleDrawPage;
