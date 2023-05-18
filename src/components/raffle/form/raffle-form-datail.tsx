import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CurrencyBRLInput } from "~/components/input/currency";
import { CreateRaffleInput } from "~/server/schema/raffle";

type Props = {
    form: UseFormReturn<CreateRaffleInput>
}

const RaffleFormDetail: React.FC<Props> = ({ form: { register, formState, control } }) => {
    return (<>
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Título</span>
            </label>
            <input type="text" {...register("title")} className={`input input-bordered w-full ${formState.errors.title ? 'input-error' : 'input-primary'}`} />
            <label className="label">
                <span className="label-text-alt">{formState.errors.title?.message}</span>
            </label>
        </div>

        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Descrição</span>
            </label>
            <textarea {...register("description")} className={`textarea h-24 ${formState.errors.description ? 'input-error' : 'textarea-primary'}`} />
            <label className="label">
                <span className="label-text-alt">{formState.errors.description?.message}</span>
            </label>
        </div>

        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Data do Sorteio</span>
            </label>
            <input type="datetime-local" {...register("drawDate")} className={`input input-bordered w-full ${!formState.errors.drawDate ? 'input-primary' : 'input-error'}`} />
            <label className="label">
                <span className="label-text-alt">{formState.errors.drawDate?.message}</span>
            </label>
        </div>

        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Preço</span>
            </label>
            <CurrencyBRLInput control={control} name="price" />
        </div>

        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Tamanho da Matriz</span>
            </label>
            <input type="number" min="2" max="10" {...register("size", { valueAsNumber: true })} className={`input input-bordered w-full ${formState.errors.size ? 'input-error' : 'input-primary'}`} />
            <label className="label">
                <span className="label-text-alt">{formState.errors.size?.message}</span>
            </label>
        </div>
    </>);
}

export default RaffleFormDetail;