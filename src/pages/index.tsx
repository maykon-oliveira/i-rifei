import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import RaffleCard from "~/components/raffle/raffle-card";

import { api } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data: raffles } = api.raffle.getAll.useQuery();

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <AuthShowcase />
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="bg-slate-400 p-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Rifas</h1>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-y-10 pt-10">
          {raffles?.map((raffle, i) => <RaffleCard key={i} raffle={raffle} />)}
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <p className="text-center text-2xl">
        {data && <span>Logged in as {data.user?.name}</span>}
      </p>
    </div>
  );
};
