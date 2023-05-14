import { type NextPage } from "next";
import { IoArrowForwardOutline, IoTicketOutline } from "react-icons/io5";

import RaffleCardShowcase from "~/components/raffle/raffles-card-showcase";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src="/index-hero.jpg" className="max-w-md rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo ao nosso Web App de Sorteios!</h1>
            <div className="py-6">
              Participe da emoção e da expectativa de ganhar prêmios incríveis com nossa inovadora plataforma de sorteios. Nosso aplicativo web oferece uma forma fácil e agradável para os usuários criarem, participarem e compartilharem sorteios. Seja um entusiasta de sorteios ou um jogador de primeira viagem, temos algo emocionante reservado para você.
            </div>
            <a href="/raffles/new" className="btn btn-primary">
              CRIAR
              <IoArrowForwardOutline />
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-slate-400 p-10">
        <div className="card lg:w-1/2 shadow-xl image-full m-10">
          <figure>
            <img src="/index-hand-ticket.jpg" />
          </figure>
        </div>
        <div className="divider divider-horizontal">
          <IoTicketOutline size={64} />
        </div>
        <div className="card lg:w-1/2 text-base-300">
          <div className="card-body">
            <h1 className="text-4xl card-title">
              Recursos
            </h1>
            <div className="stats stats-vertical bg-transparent">
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Crie Sorteios
                </div>
                <div className="text-base-200">
                  Configure facilmente seus próprios sorteios, defina os prêmios, preços dos bilhetes e duração com apenas alguns cliques.
                </div>
              </div>
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Compre Bilhetes
                </div>
                <div className="text-base-200">
                  Navegue por uma ampla variedade de sorteios empolgantes e compre bilhetes de forma rápida e segura.
                </div>
              </div>
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Compartilhe e Convide
                </div>
                <div className="text-base-200">
                  Divulgue seus sorteios favoritos por meio de compartilhamento nas redes sociais ou convide amigos para participar da diversão.
                </div>
              </div>
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Atualizações em Tempo Real
                </div>
                <div className="text-base-200">
                  Mantenha-se informado com atualizações em tempo real sobre o progresso do sorteio, vencedores e novos sorteios.
                </div>
              </div>
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Comunidade Engajada
                </div>
                <div className="text-base-200">
                  Interaja com outros entusiastas de sorteios, deixe comentários e participe de discussões animadas.
                </div>
              </div>
              <div className="stat px-0">
                <div className="stat-title text-base-300 font-bold">
                  Design Responsivo
                </div>
                <div className="text-base-200">
                  Desfrute da experiência de sorteio em qualquer lugar, com nosso design responsivo otimizado para dispositivos móveis.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-200 p-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Rifas</h1>
        </div>
        <RaffleCardShowcase />
      </div>
    </>
  );
};

export default Home;
