import { type NextPage } from 'next';
import { api } from "~/utils/trpc";
import { useRouter } from 'next/router';
import RaffleCountdown from '~/components/raffle/raffle-countdown';
import { BreadcrumbsContext } from '~/utils/context/breadcrumbs';
import { useContext, useEffect } from 'react';
import { rafflesRouter } from '~/utils/routes';
import { CurrencyBRLFormatter } from '~/components/input/currency';
import { isBefore } from 'date-fns';
import { toast } from 'react-hot-toast';
import RaffleArtboard from '~/components/raffle/artboard/raffle-artboard';
import Link from 'next/link';

type BuyerWithTicket = { id: string, name: string | null, tickets: number[], paymentConfirmed: boolean };

const RaffleViewPage: NextPage = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const router = useRouter()
    const { mutate: confirmPayment } = api.ticket.confirmPayment.useMutation();
    const { data: raffle, error, isLoading, refetch } = api.raffle.allDetails.useQuery({
        id: router.query.id as string
    });

    useEffect(() => {
        if (raffle) {
            const actions = raffle.published ? [] : [rafflesRouter.draw(raffle)];
            setBreadcrumbs([rafflesRouter.list, rafflesRouter.view(raffle)], actions);
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
                tickets: [curr.number],
                paymentConfirmed: curr.paymentConfirmed
            }

            return [user, ...acc];
        } else {
            user.tickets.push(curr.number);
            if (!curr.paymentConfirmed) {
                user.paymentConfirmed = false;
            }
        }

        return [...acc];
    }, []);

    const onConfirmPayment = (buyerWithTicket: BuyerWithTicket, value: boolean) => {
        confirmPayment({ userId: buyerWithTicket.id, raffleId: raffle.id, value }, {
            async onSuccess(data) {
                toast.success(data);
                await refetch();
            },
            onError(error) {
                toast.error(error.message);
            },
        });
    };

    const shouldBeDrawn = isBefore(raffle.drawDate, new Date());
    const totalTickets = Math.pow(raffle.size, 2);
    const progress = (raffle.tickets.length * 100) / totalTickets;

    return (
        <section className="flex flex-col">
            <div className="flex flex-col w-full mb-3 tooltip" data-tip={`${raffle.tickets.length} de ${totalTickets} números foram vendidos.`}>
                <h6 className="text-sm text-base-content/70 text-center">Progresso de venda</h6>
                <progress className="progress progress-secondary my-3" value={progress} max="100"></progress>
            </div>
            <div className="flex flex-col m-auto">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="flex flex-col">
                        {!raffle.drawn && (
                            <div className="flex justify-center pb-10 flex-col items-center">
                                <p className="text-base-content/70 text-sm mb-3">
                                    {shouldBeDrawn ? 'A Rifa já deveria ter sido sorteada.' : 'Cronômetro para o dia do sorteio'}
                                </p>
                                <RaffleCountdown date={raffle.drawDate} />
                            </div>
                        )}
                        {raffle.drawn && (
                            <div className="flex justify-center pb-10 flex-col items-center">
                                <h2 className="text-5xl">Rifa Sorteada</h2>
                                <h3 className="my-5">
                                    <span className="font-semibold mr-1 text-base-content/70">Ganhador:</span> {raffle.winner?.name}
                                </h3>
                                {!raffle.published && <p className="text-sm text-warning">Aguardando confirmação para publicar o resultado. <Link href={`/app/raffles/${raffle.id}/draw`} className="underline">Vá para a página de sorteio.</Link></p>}
                            </div>
                        )}
                        <div className="flex w-full max-w-lg mx-auto">
                            <RaffleArtboard raffle={raffle} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg text-center mb-3">Compradores</h2>
                        {!buyers.length && (<h3 className="mt-3 text-sm">Sem números vendidas.</h3>)}
                        <div className="mx-auto w-full max-w-lg">
                            {buyers.map((user, i) => (
                                <div key={i} className={`p-3 border-b flex justify-between ${raffle.winnerId === user.id ? 'bg-success' : ''}`}>
                                    <div className="flex items-center mr-3">
                                        <input type="checkbox" className={`toggle toggle-success ${user.paymentConfirmed ? '' : 'tooltip'}`} data-tip="Confirmar pagamento" onChange={(e) => onConfirmPayment(user, e.target.checked)} checked={user.paymentConfirmed} disabled={raffle.drawn} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-extrabold">{user.name}</div>
                                        <div className="flex text-sm">
                                            <div className="flex-1 text-base-content/70">Números: {user.tickets.join(", ")}</div>
                                            <div className="ml-2">Total: <CurrencyBRLFormatter displayType="text" value={raffle.price * user.tickets.length} /></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default RaffleViewPage;