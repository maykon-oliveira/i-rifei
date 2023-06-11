import { type Raffle } from '@prisma/client';
import { type ReactNode } from 'react';
import { IoBagOutline, IoCreateOutline, IoExtensionPuzzleOutline, IoEyeOutline, IoTicketOutline } from 'react-icons/io5';

export type RouteItem = {
    label: string;
    link: string;
    icon: ReactNode;
}

export const rafflesRouter = {
    list: {
        label: 'Minhas Rifas',
        link: '/app/raffles',
        icon: <IoTicketOutline />
    },
    new: { link: '/app/raffles/new', label: 'Criar Nova Rifa', icon: <IoCreateOutline /> },
    view: (raffle: Raffle) => {
        return { link: `/app/raffles/${raffle.id}/view`, label: raffle.title, icon: <IoEyeOutline /> }
    },
    overview: (raffleId: string) => {
        return { link: `/raffles/${raffleId}/overview`, label: '', icon: <IoEyeOutline /> }
    },
    draw: (raffle: Raffle) => {
        return { link: `/app/raffles/${raffle.id}/draw`, label: 'Sortear', icon: <IoExtensionPuzzleOutline /> }
    }
};

export const purchasesRouter = {
    list: {
        label: 'Rifas Compradas',
        link: '/app/purchases',
        icon: <IoBagOutline />
    },
}

const routes: RouteItem[] = [rafflesRouter.list, purchasesRouter.list]

export default routes;