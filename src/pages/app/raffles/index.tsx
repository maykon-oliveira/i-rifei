import { type NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { api } from '~/utils/trpc';
import { IoEllipsisVertical, IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';
import SocialShare from '~/components/social-share';
import { toast } from 'react-hot-toast';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BreadcrumbsContext } from '~/utils/context/breadcrumbs';
import { rafflesRouter } from '~/utils/routes';
import { Raffle } from '@prisma/client';

const MyRaffles: NextPage = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([rafflesRouter.list], [rafflesRouter.new]), []);

    const { data, refetch } = api.raffle.getMyRaffles.useQuery();
    const { mutate } = api.raffle.delete.useMutation();

    const onClickDelete = (id: string) => {
        mutate({ id }, {
            onSuccess(data) {
                toast.success(data);
                refetch();
            },
            onError(error) {
                toast.error(error.message);
            },
        })
    }

    return (
        <table className="table table-zebra table-compact w-full">
            <thead>
                <tr>
                    <th></th>
                    <th>Título</th>
                    <th className="flex justify-center">Nº Vendidos</th>
                    <th>Data do Sorteio</th>
                    <th>Sorteado</th>
                    <th className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((raffle, i) => (
                    <tr key={i}>
                        <th>
                            <ViewButton raffle={raffle} />
                        </th>
                        <td>{raffle.title}</td>
                        <td>
                            <div className="flex justify-center">
                                <div className="badge">{raffle.tickets?.length}/{raffle.size * raffle.size}</div>
                            </div>
                        </td>
                        <td>{format(raffle.drawDate, 'P p', { locale: ptBR })}</td>
                        <td><Drawn drawn={raffle.drawn} /></td>
                        <td className="text-center">
                            <div className="dropdown dropdown-hover dropdown-end">
                                <label tabIndex={0} className="btn m-1"><IoEllipsisVertical /></label>
                                <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="hover-bordered">
                                        <a onClick={() => onClickDelete(raffle.id)} className="flex justify-between">
                                            Deletar
                                            <IoTrashOutline />
                                        </a>
                                    </li>
                                    <SocialShare raffle={raffle} />
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MyRaffles;

const Drawn: React.FC<{ drawn: boolean }> = ({ drawn }) => (
    <div className={`badge ${drawn ? 'badge-success' : 'badge-error'} gap-2`}>
        {drawn ? 'Sim' : 'Não'}
    </div>
);

const ViewButton: React.FC<{ raffle: Raffle }> = ({ raffle }) => {
    const routeItem = rafflesRouter.view(raffle);
    return <Link href={routeItem.link} className="btn btn-ghost" >{routeItem.icon}</Link>
};
