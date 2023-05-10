import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/trpc";

const Home: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <AuthShowcase />
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data } = useSession();

  const { data: secretMessage } = api.raffle.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: data?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <p className="text-center text-2xl">
        {data && <span>Logged in as {data.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
    </div>
  );
};
