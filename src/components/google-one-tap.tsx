"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";
import GoogleOneTapLogin from 'react-google-one-tap-login';
import { type IGoogleCallbackResponse, type IGoogleEndPointResponse } from "react-google-one-tap-login/dist/types/types";

type Props = {
    clientId: string
}

const GoogleOneTap: React.FC<Props> = ({ clientId: client_id }) => {
    const { status } = useSession();

    if (status !== 'unauthenticated') {
        return null;
    }

    const callback = (credential: IGoogleCallbackResponse) => {
        if (credential.credential) {
            void signIn("googleonetap", {
                credential: credential.credential
            });
        }
    }

    const onSuccess = (data: IGoogleEndPointResponse) => {
        console.log(data);
    };

    const onError = (error: any) => {
        console.log(error);
    }

    return <GoogleOneTapLogin onSuccess={onSuccess} onError={onError} googleAccountConfigs={{ client_id, callback, cancel_on_tap_outside: false }} />
}

export default GoogleOneTap;