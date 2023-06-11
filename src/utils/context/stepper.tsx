import React, { createContext, useState } from "react";

export enum Step {
    DETAILS = 0,
    AWARDS = 1,
    CONFIRMATION = 2,
}

type StepperContext = {
    step: Step;
    goTo: (target: Step) => void;
};

export const StepperContext = createContext<StepperContext>({
    step: Step.DETAILS,
    goTo(_) {
        // pass
    },
});

type Props = {
    children: React.ReactNode
}

const StepperProvider: React.FC<Props> = ({ children }) => {
    const [step, setStep] = useState<Step>(Step.DETAILS);

    const goTo = (target: Step) => {
        setStep(target);
    };

    return (
        <StepperContext.Provider value={{ step, goTo }}>
            {children}
        </StepperContext.Provider>
    );
}

export default StepperProvider;