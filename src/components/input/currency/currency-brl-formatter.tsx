import { NumberFormatBase, type NumericFormatProps } from "react-number-format";

export const CurrencyBRLFormatter: React.FC<NumericFormatProps> = (props: any) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const format = (numStr: number | bigint | string) => {
        if (numStr === "")
            return "";
        return formatter.format(numStr as number);
    };

    const removeFormatting = (formattedValue: string) => {
        if (formattedValue === '') {
            return 0;
        }

        return parseFloat(formattedValue.replace(/[^0-9.,]+/g, '').replace('.', '').replace(',', '.'));
    }

    return <NumberFormatBase {...props} format={format} removeFormatting={removeFormatting} />;
}