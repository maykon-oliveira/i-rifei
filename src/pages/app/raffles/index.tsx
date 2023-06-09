import { type NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { api } from '~/utils/trpc';
import { IoEllipsisVertical, IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';
import SocialShare from '~/components/social-share';
import { toast } from 'react-hot-toast';
import { format, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BreadcrumbsContext } from '~/utils/context/breadcrumbs';
import { rafflesRouter } from '~/utils/routes';
import { type Raffle } from '@prisma/client';
import Drawn from '~/components/drawn';

const MyRafflesPage: NextPage = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([rafflesRouter.list], [rafflesRouter.new]), []);

    const { data, refetch } = api.raffle.getMyRaffles.useQuery();
    const { mutate } = api.raffle.delete.useMutation();

    const onClickDelete = (id: string) => {
        mutate({ id }, {
            async onSuccess(data) {
                toast.success(data);
                await refetch();
            },
            onError(error) {
                toast.error(error.message);
            },
        })
    }

    return (
        <div className="sm:overflow-x-auto">
            <table className="table table-zebra table-compact w-full mb-64">
                <thead>
                    <tr>
                        <th></th>
                        <th>Título</th>
                        <th className="flex justify-center">Nº Vendidos</th>
                        <th>Data do Sorteio</th>
                        <th>Sorteado</th>
                        <th className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((raffle) => {
                        const totalTickets = raffle.size * raffle.size;

                        return (
                            <tr key={raffle.id}>
                                <th>
                                    <ViewButton raffle={raffle} />
                                </th>
                                <td>{raffle.title}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className={`badge rounded ${raffle.tickets?.length === totalTickets ? 'badge-success tooltip' : ''}`} data-tip="Todos os números vendidos">{raffle.tickets?.length}/{totalTickets}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`${!raffle.drawn && isBefore(raffle.drawDate, new Date()) ? 'badge-error tooltip rounded px-2' : ''}`} data-tip="Data do sorteio expirou">
                                        {format(raffle.drawDate, 'P p', { locale: ptBR })}
                                    </span>
                                </td>
                                <td><Drawn drawn={raffle.drawn} /></td>
                                <td className="text-center">
                                    <div className="dropdown dropdown-hover dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost m-1"><IoEllipsisVertical /></label>
                                        <ul tabIndex={0} className="dropdown-content z-30 menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                            {!raffle.drawn && (
                                                <li className="hover-bordered">
                                                    <a onClick={() => onClickDelete(raffle.id)} className="flex justify-between">
                                                        Deletar
                                                        <IoTrashOutline />
                                                    </a>
                                                </li>
                                            )}
                                            <SocialShare raffle={raffle} />
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MyRafflesPage;

const ViewButton: React.FC<{ raffle: Raffle }> = ({ raffle }) => {
    const routeItem = rafflesRouter.view(raffle);
    return <Link href={routeItem.link} className="btn btn-ghost" >{routeItem.icon}</Link>
};
