import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'next-share';
import React from "react";
import SocialShareItem from './social-share-item';
import { rafflesRouter } from '~/utils/routes';

type Props = {
    raffle: any
}

const SocialShare: React.FC<Props> = ({ raffle }) => {
    let baseurl = '';

    if (typeof window !== 'undefined') {
        baseurl = location.origin;
    }

    const routeItem = rafflesRouter.overview(raffle.id);

    return (
        <>
            <li className="menu-title">
                <span>Compartilhar</span>
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Whatsapp
                        <WhatsappShareButton
                            url={`${baseurl}${routeItem.link}`}
                            title={raffle.description}
                            separator=":: "
                            ref={ref}
                        >
                            <WhatsappIcon size={20} round />
                        </WhatsappShareButton>
                    </a>
                ))} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Facebook
                        <FacebookShareButton
                            url={`${baseurl}${routeItem.link}`}
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
                            url={`${baseurl}${routeItem.link}`}
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
                            url={`${baseurl}${routeItem.link}`}
                            subject={raffle.name}
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
