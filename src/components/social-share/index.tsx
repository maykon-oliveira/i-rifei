import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'next-share';
import React from "react";
import SocialShareItem from './social-share-item';

type Props = {
    raffle: any
}

const SocialShare: React.FC<Props> = ({ raffle }) => {
    const baseurl = location.origin;

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
                            url={`${baseurl}/raffles/${raffle.id}/view`}
                            title={raffle.description}
                            separator=":: "
                            ref={ref}
                        >
                            <WhatsappIcon size={18} round />
                        </WhatsappShareButton>
                    </a>
                ))} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Facebook
                        <FacebookShareButton
                            url={`${baseurl}/raffles/${raffle.id}/view`}
                            quote={raffle.description}
                            hashtag='#irifei'
                            ref={ref}
                        >
                            <FacebookIcon size={18} round />
                        </FacebookShareButton>
                    </a>
                )} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Twitter
                        <TwitterShareButton
                            url={`${baseurl}/raffles/${raffle.id}/view`}
                            title={raffle.description}
                            ref={ref}
                        >
                            <TwitterIcon size={18} round />
                        </TwitterShareButton>
                    </a>
                )} />
            </li>
            <li className="hover-bordered">
                <SocialShareItem render={(ref) => (
                    <a onClick={() => ref.current?.click()} className="flex justify-between">
                        Email
                        <EmailShareButton
                            url={`${baseurl}/raffles/${raffle.id}/view`}
                            subject={raffle.name}
                            body={raffle.description}
                            ref={ref}
                        >
                            <EmailIcon size={18} round />
                        </EmailShareButton>
                    </a>
                )} />
            </li>
        </>
    )
};

export default SocialShare;
