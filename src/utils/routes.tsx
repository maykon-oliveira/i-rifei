import { Raffle } from '@prisma/client';
import { ReactNode } from 'react';
import { IoCreateOutline, IoEyeOutline, IoTicketOutline } from 'react-icons/io5';

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
    }
};

const routes: RouteItem[] = [rafflesRouter.list]

export default routes;