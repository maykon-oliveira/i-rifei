import { type NextPage } from 'next';
import { api } from "~/utils/trpc";
import { useRouter } from 'next/router';
import RaffleCountdown from '~/components/raffle/raffle-countdown';
import RaffleCard from '~/components/raffle/raffle-card';
import { BreadcrumbsContext } from '~/utils/context/breadcrumbs';
import { useContext, useEffect } from 'react';
import { rafflesRouter } from '~/utils/routes';

type BuyerWithTicket = { id: string, name: string | null, tickets: number[] };

const RaffleView: NextPage = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const router = useRouter()
    const { data: raffle, error, isLoading } = api.raffle.allDetails.useQuery({
        id: router.query.id as string
    });

    useEffect(() => {
        if (!!raffle) {
            setBreadcrumbs([rafflesRouter.list, rafflesRouter.view(raffle)], [])
        }
    }, [raffle]);

    if (!raffle || isLoading) {
        return <h1>{error?.message}</h1>
    }


    const buyers: BuyerWithTicket[] = raffle.tickets.reduce((acc: BuyerWithTicket[], curr) => {
        let user = acc.find(it => it.id === curr.userId);

        if (!user) {
            user = {
                ...curr.user,
                tickets: [curr.number]
            }

            return [user, ...acc];
        } else {
            user.tickets.push(curr.number);
        }

        return [...acc];
    }, []);

    return (
        <section className="flex flex-col m-auto">
            <div className="flex justify-center pb-10 flex-col items-center">
                <p className="text-base-content/70 text-sm mb-3">Cronômetro para o dia do sorteio</p>
                <RaffleCountdown date={raffle.drawDate} />
            </div>
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="flex max-w-xl mx-auto">
                    <RaffleCard raffle={raffle} onTicketClick={() => { }} />
                </div>
                <div className="px-10">
                    <h2 className="text-lg text-center">Compradores</h2>
                    {!buyers.length && (<h3 className="mt-3 text-sm">Sem rifas vendidas.</h3>)}
                    {buyers.map((user, i) => (
                        <div key={i} className="py-3 border-b">
                            <div className="text-lg font-extrabold">{user.name}</div>
                            <div className="text-base-content/70 text-sm">Números: {user.tickets.join(", ")}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default RaffleView;