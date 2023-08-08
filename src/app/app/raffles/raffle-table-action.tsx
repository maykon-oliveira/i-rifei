"use client";

import { type Raffle } from "@prisma/client";
import React from "react";
import { toast } from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import SocialShare from "~/components/social-share";
import { api } from "~/utils/trpc";

type Props = {
    raffle: Raffle;
    onDelete: () => Promise<void>;
}

const RafleTableActions: React.FC<Props> = ({ raffle, onDelete }) => {
    const { mutate, isLoading } = api.raffle.delete.useMutation();
    const onClickDelete = (id: string) => {
        const dimiss = toast.loading('Deletando...');

        mutate({ id }, {
            async onSuccess(data) {
                toast.dismiss(dimiss);
                toast.success(data);
                await onDelete();
            },
            onError(error) {
                toast.error(error.message);
                toast.dismiss(dimiss);
            },
        });
    }

    return (
        <>
            {!raffle.drawn && (
                <li className={`${isLoading ? 'disabled' : ''} hover-bordered`}>
                    <a onClick={() => onClickDelete(raffle.id)} className="flex justify-between">
                        Deletar
                        <IoTrashOutline />
                    </a>
                </li>
            )}
            <SocialShare raffle={raffle} />
        </>
    );
}

export default RafleTableActions;