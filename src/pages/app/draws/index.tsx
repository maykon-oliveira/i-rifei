import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { drawsRouter } from "~/utils/routes";

type Props = {
    
}

const DrawsPage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([drawsRouter.list], []), []);

    return (
        <div>
            
        </div>
    );
}

export default DrawsPage;