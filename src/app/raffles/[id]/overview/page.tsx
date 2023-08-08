import { type Metadata } from "next";
import { raffleRouter } from "~/server/api/routers/raffle";
import { prisma } from "~/server/db";
import { isBefore } from "date-fns";
import OverviewTable from "./overview-table";
import dynamic from "next/dynamic";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "~/components/social-share";
import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";
import LandpageLayout from "~/app/components/landpage-layout";

const RaffleCountdown = dynamic(
    () => import('~/components/raffle/raffle-countdown'),
    {
        ssr: false,
        loading: () => <p>Carregando...</p>,
    }
)

type Props = {
    params: {
        id: string;
    }
}

async function getRaffleData(id: string) {
    try {
        const caller = raffleRouter.createCaller({ prisma, session: null });
        const raffle = await caller.overviewDetails({
            id
        });
        return raffle;
    } catch (error) {
        if (error instanceof TRPCError) {
            if (error.code === 'NOT_FOUND') {
                notFound();
            }
        }
        throw error;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const raffle = await getRaffleData(params.id);

    return {
        title: raffle.title,
        description: raffle.description,
        publisher: raffle.owner.name,
    }
}

export default async function Page({ params }: Props) {
    const raffle = await getRaffleData(params.id);

    const isExpired = isBefore(raffle.drawDate, new Date());

    if (raffle.drawn && !raffle.published) {
        return (
            <LandpageLayout>
                <div className="hero my-auto">
                    <div className="hero-content text-center -mt-32">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Aguardando Confirmação</h1>
                            <p className="py-6">O sorteio já foi realizado. Aguardando confirmação do dono da rifa.</p>
                        </div>
                    </div>
                </div>
            </LandpageLayout>
        )
    }

    return (
        <LandpageLayout>
            <div className="hero flex-1">
                <div className="hero-content flex-col relative m-0 mt-3 w-full sm:w-auto">
                    <div className="absolute top-0 right-0 mr-2">
                        <div className="dropdown dropdown-hover dropdown-end w-full">
                            <label tabIndex={0} className="btn btn-outline btn-circle m-1 btn-block px-3">
                                <IoShareSocialOutline />
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-30 menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                <SocialShare raffle={raffle} />
                            </ul>
                        </div>
                    </div>
                    {!raffle.drawn && (
                        <div className="flex justify-center flex-col items-center">
                            {!isExpired && (
                                <>
                                    <p className="text-base-content/70 text-sm mb-3">Cronômetro para o dia do sorteio.</p>
                                    <RaffleCountdown date={raffle.drawDate} />
                                </>
                            )}
                            {isExpired && <h1 className="text-lg text-warning">A rifa será sorteada em breve.</h1>}
                        </div>
                    )}
                    {raffle.drawn && (
                        <div className="flex justify-center pb-10 flex-col items-center">
                            <h2 className="text-5xl">Rifa Sorteada</h2>
                            <h3 className="my-5">
                                <span className="font-semibold mr-1 text-base-content/70">Ganhador:</span> {raffle.winner?.name}
                            </h3>
                        </div>
                    )}
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">{raffle.title}</h1>
                        <p className="py-6 break-all max-w-xl">{raffle.description}</p>
                    </div>
                    <div className="my-5 mb-10 shadow-xl w-full sm:w-96">
                        <OverviewTable raffle={raffle} />
                    </div>
                    <div className="flex flex-col w-full">
                        <h3 className="text-3xl text-center mb-3 underline">Prêmios</h3>
                        <ul className="list-decimal menu menu-md">
                            {raffle.awards.map((award, i) => (
                                <li key={award.id} className="hover-bordered">
                                    <a className="cursor-default">{i + 1}º {award.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </LandpageLayout>
    )
}