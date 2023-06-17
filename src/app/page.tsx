import Link from "next/link";
import React, { Suspense } from "react";
import { IoArrowForwardOutline, IoTicketOutline } from "react-icons/io5";
import RaffleCardShowcase from "~/components/raffle/raffles-card-showcase";

type Props = {
    params: {

    }
}

export default function Page({ params }: Props) {
    return (
        <>
            <div className="hero items-start lg:min-h-screen lg:items-center lg:-mt-14">
                <div className="hero-content flex-col justify-start lg:flex-row">
                    <img alt="" src="/brand/brand-full.svg" className="w-auto md:max-w-md" />
                    <div>
                        <h1 className="text-3xl font-bold">Bem-vindo ao nosso Web App de Sorteios!</h1>
                        <div className="py-6">
                            Nosso aplicativo web oferece uma forma fácil e agradável para os usuários criarem, participarem e compartilharem sorteios. Seja um entusiasta de sorteios ou um jogador de primeira viagem, temos algo emocionante reservado para você.
                        </div>
                        <Link href="/app/raffles/new" className="btn btn-primary">
                            CRIAR
                            <IoArrowForwardOutline />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full sm:p-10 lg:flex-row">
                <div className="card lg:w-1/2 shadow-xl image-full m-10">
                    <figure>
                        <img src="/index-hero.jpg" />
                    </figure>
                </div>
                <div className="divider lg:divider-horizontal">
                    <IoTicketOutline size={64} />
                </div>
                <div className="card lg:w-1/2">
                    <div className="card-body">
                        <h1 className="text-4xl card-title">
                            Recursos
                        </h1>
                        <div className="stats stats-vertical bg-transparent">
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Crie Sorteios
                                </div>
                                <div className="">
                                    Configure facilmente seus próprios sorteios, defina os prêmios, preços dos bilhetes e duração com apenas alguns cliques.
                                </div>
                            </div>
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Compre Bilhetes
                                </div>
                                <div className="">
                                    Navegue por uma ampla variedade de sorteios empolgantes e compre bilhetes de forma rápida e segura.
                                </div>
                            </div>
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Compartilhe e Convide
                                </div>
                                <div className="">
                                    Divulgue seus sorteios favoritos por meio de compartilhamento nas redes sociais ou convide amigos para participar da diversão.
                                </div>
                            </div>
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Atualizações em Tempo Real
                                </div>
                                <div className="">
                                    Mantenha-se informado com atualizações em tempo real sobre o progresso do sorteio, vencedores e novos sorteios.
                                </div>
                            </div>
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Comunidade Engajada
                                </div>
                                <div className="">
                                    Interaja com outros entusiastas de sorteios, deixe comentários e participe de discussões animadas.
                                </div>
                            </div>
                            <div className="stat px-0">
                                <div className="stat-title font-bold">
                                    Design Responsivo
                                </div>
                                <div className="">
                                    Desfrute da experiência de sorteio em qualquer lugar, com nosso design responsivo otimizado para dispositivos móveis.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-base-200 sm:p-10">
                <div className="text-center">
                    <h1 className="text-5xl font-bold py-5 md:pt-0 md:pb-10">Rifas</h1>
                </div>
                <Suspense fallback={<h1>Carregando...</h1>}>
                    <RaffleCardShowcase />
                </Suspense>
            </div>
        </>
    );
}
