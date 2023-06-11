import { NumberFormatBase, type NumericFormatProps } from "react-number-format";

export const CurrencyBRLFormatter: React.FC<NumericFormatProps> = (props: any) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const format = (numStr: any) => {
        if (numStr === "")
            return "";
        return formatter.format(numStr);
    };

    const removeFormatting = (formattedValue: any) => {
        if (formattedValue === '') {
            return 0;
        }

        return parseFloat(formattedValue.replace(/[^0-9.,]+/g, '').replace('.', '').replace(',', '.'));
    }

    return <NumberFormatBase {...props} format={format} removeFormatting={removeFormatting} />;
}