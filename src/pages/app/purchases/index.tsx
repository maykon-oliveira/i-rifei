import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { purchasesRouter } from "~/utils/routes";

type Props = {

}

const MyPurchasesPage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([purchasesRouter.list], []), []);

    return (
        <div>

        </div>
    );
}

export default MyPurchasesPage;