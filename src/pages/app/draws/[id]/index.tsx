import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { drawsRouter } from "~/utils/routes";
import { api } from "~/utils/trpc";

type Props = {

}

const DrawRafflePage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const router = useRouter()
    const { data: raffle } = api.raffle.allDetails.useQuery({
        id: router.query.id as string
    });

    useEffect(() => {
        if (!!raffle) {
            setBreadcrumbs([drawsRouter.list, drawsRouter.draw(raffle)], []);
        }
    }, [raffle]);

    return (
        <div>

        </div>
    );
}

export default DrawRafflePage;