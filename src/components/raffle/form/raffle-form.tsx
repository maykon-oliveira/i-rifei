import React, { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateRaffleInput } from "~/server/schema/raffle";
import RaffleFormDetail from "./raffle-form-datail";
import RaffleFormAward from "./raffle-form-award";
import RaffleFormConfirmation from "./raffle-fom-confirmation";
import { Step, StepperContext } from "~/utils/context/stepper";

type Props = {
    form: UseFormReturn<CreateRaffleInput>
}


const RaffleForm: React.FC<Props> = ({ form }) => {
    const { step, goTo } = useContext(StepperContext);

    function getStepComponent() {
        switch (step) {
            case Step.DETAILS: return <RaffleFormDetail form={form} />;
            case Step.AWARDS: return <RaffleFormAward form={form} />;
            case Step.CONFIRMATION: return <RaffleFormConfirmation form={form} />;
            default: return null;
        }
    }

    return (
        <>
            <form className="flex-1 min-h-12 w-full">
                {getStepComponent()}
            </form>
            <ul className="steps w-full pt-5">
                <li onClick={() => goTo(Step.DETAILS)} className={`step step-neutral cursor-pointer ${step >= 0 && 'step-primary'}`}>
                    Detalhes
                </li>
                <li onClick={() => goTo(Step.AWARDS)} className={`step step-neutral cursor-pointer ${step >= 1 && 'step-primary'}`}>
                    Prêmios
                </li>
                <li onClick={(e) => goTo(Step.CONFIRMATION)} className={`step step-neutral cursor-pointer ${step >= 2 && 'step-primary'}`}>
                    Confirmar
                </li>
            </ul>
        </>
    );
}

export default RaffleForm;