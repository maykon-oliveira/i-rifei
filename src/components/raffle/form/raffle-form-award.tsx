import React, { useCallback } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { CreateRaffleInput } from "~/server/schema/raffle";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";

type Props = {
    form: UseFormReturn<CreateRaffleInput>
}

const RaffleFormAward: React.FC<Props> = ({ form: { control, register, formState: { errors } } }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "awards"
    });

    const addNew = () => append({ name: '' });

    const onPressEnter = useCallback((cb: () => void) => (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            cb();
        }
    }, [])

    return (
        <>
            <div className="form-control w-full min-h-full">
                <label className="label">
                    <span className="label-text">Adicionar Prêmios</span>
                </label>
                {fields.map((field, i) => (
                    <span key={field.id}>
                        <div className="input-group">
                            <input autoFocus onKeyDown={onPressEnter(addNew)} {...register(`awards.${i}.name`, { required: true })} type="text" className={`input input-bordered w-full ${errors.awards?.[i] ? 'input-error' : 'input-primary'}`} />
                            <AddOrDeleteButton
                                index={i}
                                size={fields.length - 1}
                                add={addNew}
                                remove={() => remove(i)}
                            />
                        </div>
                        <label className="label">
                            <span className="label-text-alt">{errors.awards?.[i]?.name?.message}</span>
                        </label>
                    </span>
                ))}
            </div>
        </>
    );
}

export default RaffleFormAward;

const AddOrDeleteButton: React.FC<{
    index: number;
    size: number;
    add: () => void;
    remove: () => void;
}> = ({ index, size, add, remove }) => {
    return (
        <>
            {(index !== size) && <button onClick={remove} className="btn btn-square">
                <IoTrashOutline size={16} />
            </button>}
            {(index === size) && <button onClick={add} className="btn btn-square">
                <IoAddOutline size={16} />
            </button>}
        </>
    )
}