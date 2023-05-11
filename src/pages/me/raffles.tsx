import { type NextPage } from 'next';
import React from 'react';
import { api } from '~/utils/trpc';
import { IoEllipsisVertical, IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import Link from 'next/link';
import SocialShare from '~/components/social-share';
import { toast } from 'react-hot-toast';

const MyRaffles: NextPage = () => {
    const { data, refetch } = api.raffle.getMyRaffles.useQuery();
    const { mutate } = api.raffle.delete.useMutation();
    const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

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
        <div className="py-10">
            <table className="table table-zebra table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Título</th>
                        <th>Data do Sorteio</th>
                        <th>Sorteado</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((raffle, i) => (
                        <tr key={i}>
                            <th>
                                <Link href={`/raffles/${raffle.id}/view`} className="btn btn-ghost">
                                    <IoEyeOutline />
                                </Link>
                            </th>
                            <td>{raffle.name}</td>
                            <td>{raffle.drawDay ? formatter.format(raffle.drawDay) : '-'}</td>
                            <td><Drawn drawn={raffle.drawn} /></td>
                            <td className="text-center">
                                <div className="dropdown dropdown-hover">
                                    <label tabIndex={0} className="btn m-1"><IoEllipsisVertical /></label>
                                    <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                        <li className="hover-bordered">
                                            <a onClick={() => onClickDelete(raffle.id)} className="flex justify-between">
                                                Deletar
                                                <IoTrashOutline />
                                            </a>
                                        </li>
                                        <li className="menu-title">
                                            <span>Compartilhar</span>
                                        </li>
                                        <SocialShare raffle={raffle} />
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MyRaffles;

const Drawn: React.FC<{ drawn: boolean }> = ({ drawn }) => (
    <div className={`badge ${drawn ? 'badge-success' : 'badge-error'} gap-2`}>
        {drawn ? 'Sim' : 'Não'}
    </div>
);
