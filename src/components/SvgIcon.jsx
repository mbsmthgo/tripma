import Icon from "./Icon.jsx";

export default function SvgIcon({iconName}) {
    return (
        <svg width="22.5" height="22.5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Icon iconName={iconName} />
        </svg>
    )
}