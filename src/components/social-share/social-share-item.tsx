import { type ReactElement, useRef } from "react";

type Props = {
    render: (ref: React.RefObject<HTMLButtonElement>) => ReactElement
}

const SocialShareItem: React.FC<Props> = ({ render }) => {
    const ref = useRef<HTMLButtonElement>(null);
    return render(ref);
};

export default SocialShareItem;