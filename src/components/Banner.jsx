import React from "react";
import classNames from "classnames";

export default function Banner({variant="neutral"}) {
    const [visible, setVisible] = React.useState(true);
    const defaultStyle = "w-screen h-20 shadow-lg flex justify-center items-center p-10 text-center text-xl font-normal"
    const message = {
        neutral: "bg-violet-500 text-violet-50",
        error: "bg-red-400 text-white",
        caution: "bg-yellow-400 text-violet-900"
    }
    const text = {
        neutral: "Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout. Promotion valid for new users only.",
        error: "Trimpa is currently experiencing an outage. We appreciate your patience. Stay up to date at status.tripma.com.",
        caution: "Tripma will be undergoing routine maintenance in 30 minutes. We expect this to take no longer than 15 minutes. Stay up to date at status.tripma.com."
    }
    const bannerStyles = classNames(defaultStyle, message[variant])
    return (
        <>
            {visible ?
            <div className={bannerStyles}>
                <p className="flex-1">{text[variant]}</p>
                <img className="cursor-pointer w-10" src="src/assets/cross-icon.svg" alt="Cross Icon"
                     onClick={() => setVisible(false)}/>
            </div> : null}
        </>
    )
}