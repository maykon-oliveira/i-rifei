import { useEffect, useState } from "react";
import { differenceInMilliseconds } from "date-fns";

type Props = {
    date: Date;
}

const RaffleCountdown: React.FC<Props> = ({ date }) => {
    const [timeleft, setTimeleft] = useState(calculateTimeleft(date));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeleft(calculateTimeleft(date));
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    const days = timeleft.days.toString().padStart(2, '0');
    const hours = timeleft.hours.toString().padStart(2, '0');
    const minutes = timeleft.minutes.toString().padStart(2, '0');
    const seconds = timeleft.seconds.toString().padStart(2, '0');

    return <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                {days}
            </span>
            dias
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                {hours}
            </span>
            horas
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                {minutes}
            </span>
            min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                {seconds}
            </span>
            seg
        </div>
    </div>
}

export default RaffleCountdown;

function calculateTimeleft(targetDate: Date) {
    const timeRemaining = Math.max(0, differenceInMilliseconds(targetDate, new Date()));
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return { days, hours, minutes, seconds };
}