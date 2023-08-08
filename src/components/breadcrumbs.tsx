"use client";

import React, { useContext } from "react";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";

type Props = {

}

const Breadcrumbs: React.FC<Props> = () => {
    const { paths, actions } = useContext(BreadcrumbsContext);

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="text-sm breadcrumbs">
                <ul>
                    {paths.map((path, i) => {                        
                        if (i === paths.length - 1) {
                            return <li key={i}>{path.label}</li>
                        }
                        return <li key={i}><a href={path.link}>{path.label}</a></li>
                    })}
                </ul>
            </div>
            <div className="grid gap-x-2 mr-5">
                {actions.map((action, i) => (
                    <div key={i} className="tooltip tooltip-bottom" data-tip={action.label}>
                        <a href={action.link} className="btn btn-sm md:btn-md btn-primary">
                            {action.icon}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Breadcrumbs;