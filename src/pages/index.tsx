import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
    </>
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
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {data && <span>Logged in as {data.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
    </div>
  );
};
