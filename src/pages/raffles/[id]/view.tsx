import { type NextPage } from 'next';
import { api } from "~/utils/trpc";
import RaffleTable from '~/components/raffle/raffle-table';
import { CurrencyBRLFormatter } from '~/components/input/currency';
import { useRouter } from 'next/router';
import RaffleCountdown from '~/components/raffle/raffle-countdown';

const RaffleView: NextPage = () => {
    const router = useRouter()
    const { data: raffle, error } = api.raffle.getOne.useQuery({
        id: router.query.id as string
    });

    if (!raffle) {
        return <h1>{error?.message}</h1>
    }

    return (
        <section className="flex flex-col m-auto">
            {raffle?.drawDay && <div className="flex justify-center pb-5">
                <RaffleCountdown date={raffle?.drawDay} />
            </div>}
            <div className="card bg-base-300 max-w-lg">
                <div className="px-10 pt-10">
                    <RaffleTable size={raffle.size || 9} />
                </div>
                <div className="card-body">
                    <h2 className="card-title break-all justify-between">
                        {raffle.name}
                        <div className="badge badge-secondary">
                            <CurrencyBRLFormatter displayType="text" value={raffle.price} />
                        </div>
                    </h2>
                    <p className="leading-relaxed mt-4 break-all">{raffle.description}</p>
                </div>
            </div>
        </section>
    )
}

export default RaffleView;