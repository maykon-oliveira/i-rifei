import React, { createContext, useState } from "react";
import { type RouteItem } from "../routes";

type BreadcrumbsContext = {
    paths: RouteItem[];
    actions: RouteItem[];
    setBreadcrumbs: (paths: RouteItem[], actions: RouteItem[]) => void;
};

export const BreadcrumbsContext = createContext<BreadcrumbsContext>({
    paths: [],
    actions: [],
    setBreadcrumbs(_, __) {
        // pass
    },
});

type Props = {
    children: React.ReactNode
}

const BreadcrumbsProvider: React.FC<Props> = ({ children }) => {
    const [breadcrumbs, upBreadcrumbs] = useState<{ paths: RouteItem[], actions: RouteItem[] }>({
        paths: [],
        actions: []
    });

    const setBreadcrumbs = (paths: RouteItem[], actions: RouteItem[]) => {
        upBreadcrumbs({ paths: paths , actions })
    }

    return (
        <BreadcrumbsContext.Provider value={{ ...breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbsContext.Provider>
    );
}

export default BreadcrumbsProvider;