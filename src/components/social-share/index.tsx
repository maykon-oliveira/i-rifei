"use client";

import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'next-share';
import React from "react";
import SocialShareItem from './social-share-item';
import { rafflesRouter } from '~/utils/routes';
import { IoLinkOutline } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import { type Raffle } from '@prisma/client';

type Props = {
    raffle: Raffle
}

const SocialShare: React.FC<Props> = ({ raffle }) => {
    let baseurl = '';

    if (typeof window !== 'undefined') {
        baseurl = location.origin;
    }

    const routeItem = rafflesRouter.overview(raffle.id);
    const url = `${baseurl}${routeItem.link}`;

    const onCopyLinkClick = () => {
        void navigator.clipboard.writeText(url).then(() => toast.custom('Link copiado!'));
    }

    return (
        <>
            <li className="menu-title">
                <span>Compartilhar</span>
            </li>
            <li className="hover-bordered">
                <a onClick={onCopyLinkClick} className="justify-between">Copiar Link <IoLinkOutline /></a>
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={ref => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Whatsapp
                        <WhatsappShareButton
                            url={url}
                            title={raffle.title}
                            separator=":: "
                            ref={ref}
                        >
                            <WhatsappIcon size={20} round />
                        </WhatsappShareButton>
                    </a>
                )} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Facebook
                        <FacebookShareButton
                            url={url}
                            quote={raffle.description}
                            hashtag='#irifei'
                            ref={ref}
                        >
                            <FacebookIcon size={20} round />
                        </FacebookShareButton>
                    </a>
                )} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Twitter
                        <TwitterShareButton
                            url={url}
                            title={raffle.description}
                            ref={ref}
                        >
                            <TwitterIcon size={20} round />
                        </TwitterShareButton>
                    </a>
                )} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Email
                        <EmailShareButton
                            url={url}
                            subject={raffle.title}
                            body={raffle.description}
                            ref={ref}
                        >
                            <EmailIcon size={20} round />
                        </EmailShareButton>
                    </a>
                )} />
            </li>
        </>
    )
};

export default SocialShare;
