import { type Control, Controller } from "react-hook-form";
import { CurrencyBRLFormatter } from "./currency-brl-formatter";

type Props = {
    control?: Control<any>,
    name: string
}

export const CurrencyBRLInput: React.FC<Props> = ({ control, name }) => {
    return <Controller control={control} name={name} render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
    }) => (
        <>
            <CurrencyBRLFormatter
                value={value as string}
                onBlur={onBlur}
                onValueChange={(values) => onChange(values.floatValue)}
                className={`input input-bordered w-full ${error ? 'input-error' : 'input-primary'}`}
            />
            <label className="label">
                <span className="label-text-alt">{error?.message}</span>
            </label>
        </>
    )} />
};
