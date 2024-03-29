import React from "react";
import { useToaster } from "react-hot-toast";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoInformationCircleOutline } from "react-icons/io5";

type Props = {

}

const Notifications: React.FC<Props> = () => {
    const { toasts, handlers } = useToaster({
        success: {
            className: "alert-success",
            icon: <IoCheckmarkCircleOutline />
        },
        error: {
            className: "alert-error",
            icon: <IoCloseCircleOutline />
        },
        custom: {
            icon: <IoInformationCircleOutline />
        },
        loading: {
            icon: <span className="loading loading-spinner loading-sm"></span>
        }
    });
    const { startPause, endPause, updateHeight } = handlers;

    return (
        <div
            className="toast max-w-full min-w-[auto] toast-top toast-end"
            style={{
                zIndex: 999
            }}
            onMouseEnter={startPause}
            onMouseLeave={endPause}
        >
            {toasts.map((toast) => {
                const ref = (el: HTMLDivElement) => {
                    if (el && typeof toast.height !== "number") {
                        const height = el.getBoundingClientRect().height;
                        updateHeight(toast.id, height);
                    }
                };
                return (
                    <div
                        key={toast.id}
                        ref={ref}
                        className={`alert shadow-lg ${toast.className ?? ''}`}
                        style={{
                            transition: 'all 0.5s ease-out',
                            opacity: toast.visible ? 1 : 0,
                        }}
                        {...toast.ariaProps}
                    >
                        {toast.icon}
                        <span>{toast.message as any}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Notifications;