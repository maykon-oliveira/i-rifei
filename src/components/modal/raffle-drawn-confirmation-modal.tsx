import { type Raffle, type User } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { ModalContext } from "~/utils/context/modal";
import { rafflesRouter } from "~/utils/routes";
import { api } from "~/utils/trpc";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";

type Props = {
    raffle: Raffle & {
        winner: User | null
    }
}

const RaffleDrawnConfirmationModal: React.FC<Props> = ({ raffle }) => {
    const { closeModal } = useContext(ModalContext);
    const router = useRouter();
    const { mutate: drawnConfirm, isLoading: isConfirming } = api.raffle.drawnConfirm.useMutation();

    const handleOnConfirm = () => {
        drawnConfirm({ id: raffle.id }, {
            async onSuccess(data) {
                toast.success(data);
                const rounterItem = rafflesRouter.view(raffle);
                await router.push(rounterItem.link);
                closeModal();
            },
            onError(error) {
                toast.error(error.message);
            },
        });
    }

    return (
        <div className="hero">
            <div className="hero-content text-center">
                <div className="absolute top-0 right-0">
                    <button onClick={closeModal} className="btn btn-ghost tooltip tooltip-left" data-tip="Fechar">
                        <IoCloseCircleOutline />
                    </button>
                </div>
                <div className="max-w-md flex flex-col">
                    <h3 className="text-3xl font-bold text-base-content/70 mb-3">Confirmar Ganhador</h3>
                    <p>Ao confirmar, será publicado para todos os compradores o ganhador.</p>
                    <h2 className="text-2xl py-5 font-bold">{raffle.winner?.name}</h2>
                    <div className="avatar justify-center pb-10">
                        <div className="w-24 rounded-full">
                            <Image alt="" src={raffle.winner?.image ?? ''} referrerPolicy="no-referrer" />
                        </div>
                    </div>
                    <button disabled={isConfirming} onClick={handleOnConfirm} className="btn btn-primary">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default RaffleDrawnConfirmationModal;