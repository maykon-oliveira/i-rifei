import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SubmitErrorHandler, UseFormReturn, FieldErrors } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CreateRaffleInput } from "~/server/schema/raffle";
import { StepperContext } from "~/utils/context/stepper";
import { api } from "~/utils/trpc";
import { parse, formatISO } from "date-fns";

type Props = {
    form: UseFormReturn<CreateRaffleInput>
}

type StepHasError = (errors: FieldErrors<CreateRaffleInput>) => boolean

const stepsErrorHandlers: StepHasError[] = [
    (errors) => {
        const fields = ["title", "description", "drawDate", "price", "size"];

        return Object
            .entries(errors)
            .filter(([key]) => fields.includes(key))
            .length > 0
    }
    ,
    (errors) => {
        const fields = ["awards"];

        return Object
            .entries(errors)
            .filter(([key]) => fields.includes(key))
            .length > 0
    }

]

const RaffleFormConfirmation: React.FC<Props> = ({ form }) => {
    const router = useRouter();
    const { goTo } = useContext(StepperContext);
    const { mutate } = api.raffle.create.useMutation();

    const onError: SubmitErrorHandler<CreateRaffleInput> = (errors) => {
        for (const [index, stepHandler] of stepsErrorHandlers.entries()) {
            if (stepHandler(errors)) {
                goTo(index);
                break;
            }
        }
    }

    function onSubmit(value: CreateRaffleInput) {
        const drawDate = parse(value.drawDate, 'yyyy-MM-dd\'T\'hh:mm', new Date());

        mutate({ ...value, drawDate: formatISO(drawDate) }, {
            onSuccess(data) {
                toast.success(data);
                router.push('/me/raffles');
            },
            onError(error) {
                toast.error(error.message);
            },
        })

        return {}
    }

    return (
        <div className="hero h-full">
            <div className="hero-content p-0 flex-col">
                <div>
                    <h1 className="text-4xl font-bold">Estamos quase lá!</h1>
                    <p className="py-6">Veja uma prévia de como ficará a sua Rifa. Verifique as informações antes de confirmar.</p>
                </div>
                <div className="flex justify-center">
                    <button onClick={form.handleSubmit(onSubmit, onError)} className="btn btn-primary">CONFIRMAR</button>
                </div>
            </div>
        </div>
    );
}

export default RaffleFormConfirmation;