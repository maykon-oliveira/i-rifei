import { type NextPage } from 'next';
import { api } from "~/utils/trpc";
import { useRouter } from 'next/router';
import RaffleCountdown from '~/components/raffle/raffle-countdown';
import RaffleCard from '~/components/raffle/raffle-card';

const RaffleView: NextPage = () => {
    const router = useRouter()
    const { data: raffle, error } = api.raffle.getOne.useQuery({
        id: router.query.id as string
    });

    if (!raffle) {
        return <h1>{error?.message}</h1>
    }

    return (
        <section className="flex flex-col m-auto max-w-lg">
            {raffle?.drawDay && <div className="flex justify-center pb-5">
                <RaffleCountdown date={raffle?.drawDay} />
            </div>}
            <RaffleCard raffle={raffle}/>
        </section>
    )
}

export default RaffleView;