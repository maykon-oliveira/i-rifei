import React, { useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";

type Props = {

}

const Breadcrumbs: React.FC<Props> = () => {
    const { paths, actions } = useContext(BreadcrumbsContext);

    return (
        <div className="flex flex-row justify-between items-center px-6 py-4 xl:pr-2">
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
            <div className="grig gap-x-2">
                {actions.map((action, i) => (
                    <div key={i} className="tooltip tooltip-bottom" data-tip={action.label}>
                        <a href={action.link} className="btn btn-primary">
                            {action.icon}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Breadcrumbs;