import React from "react";

type Props = {

}

const Loading: React.FC<Props> = () => {
    return <div className="flex justify-center">
        <span className="loading loading-ball loading-lg"></span>
    </div>
}

export default Loading;