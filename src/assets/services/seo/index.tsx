import { FC } from "react";

type IconProps = {
    color?: string;
    size?: string | number;
    width?: string;
    height?: string;
} & React.SVGAttributes<SVGElement>;


export const Card1Icon: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            {...attributes}
        >
            <g clipPath="url(#clip0_2046_12791)">
                <path
                    fill="#fff"
                    d="M4.75 11a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M9.75 11a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M4.75 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M9.75 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M14.75 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M19.75 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"
                ></path>
                <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M1.25 1.25v27a2.5 2.5 0 0 0 2.5 2.5h27"
                ></path>
                <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M8.5 26A2.5 2.5 0 0 1 6 23.5V21a2.5 2.5 0 1 1 5 0v2.5A2.5 2.5 0 0 1 8.5 26M18.5 26a2.5 2.5 0 0 1-2.5-2.5V11a2.5 2.5 0 1 1 5 0v12.5a2.5 2.5 0 0 1-2.5 2.5M28.25 26a2.5 2.5 0 0 1-2.5-2.5V3.75a2.5 2.5 0 1 1 5 0V23.5a2.5 2.5 0 0 1-2.5 2.5"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_2046_12791">
                    <path fill="#fff" d="M0 0h32v32H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};

export const Card2Icon: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            {...attributes}
        >
            <g clipPath="url(#clip0_2046_12762)">
                <g
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    clipPath="url(#clip1_2046_12762)"
                >
                    <path d="M23.75 23.197c.909.91.988 2.466.089 3.366-.9.899-2.368.819-3.277-.09l-.188-.16c.91.91.932 2.369.032 3.268-.899.9-2.379.89-3.289-.019l-.812-.805M27.16 20.061c.899.9.899 2.372 0 3.27-.9.9-2.372.9-3.271 0l-.139-.134-.285-.286"></path>
                    <path d="m30.75 8.75-9.812-8c-3.283 0-6.42 1.36-8.665 3.756L9.813 7.13c-.991.992-1.01 2.633 0 3.605a2.5 2.5 0 0 0 3.5-.034l1.135-1.134a5.326 5.326 0 0 1 7.219-.29l8.409 7.16c.899.9.899 2.371 0 3.27-.9.9-2.372.9-3.27 0l-.257-.256M13.458 21.497c-.9-.9-2.37-.9-3.27 0l-1.834 1.815c-.91.91-.918 2.39-.019 3.29.9.899 2.38.89 3.29-.02l1.833-1.814c.9-.9.9-2.371 0-3.27M10.208 18.247c-.899-.9-2.37-.9-3.27 0l-2.097 2.057c-.9.9-.9 2.371 0 3.27.882.883 2.318.82 3.22-.03l2.15-2.107c.9-.9.897-2.29-.003-3.19M16.13 25.491c-.924-.923-2.393-.977-3.317-.053l-.75.75c-.923.923-.899 2.446.025 3.37a2.38 2.38 0 0 0 3.359 0l.682-.708a2.38 2.38 0 0 0 0-3.359"></path>
                    <path d="M6.949 14.987c-.9-.9-2.371-.9-3.27 0L1.924 16.68c-.9.9-.9 2.371 0 3.27.899.9 2.37.9 3.27 0l1.754-1.693c.9-.9.9-2.37 0-3.27M14.063 2.644A11.88 11.88 0 0 0 7.628.75L1.25 7.125"></path>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2046_12762">
                    <path fill="#fff" d="M0 0h32v32H0z"></path>
                </clipPath>
                <clipPath id="clip1_2046_12762">
                    <path fill="#fff" d="M0-.5h32v32H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};

export const Card3Icon: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            fill="none"
            viewBox="0 0 32 33"
            {...attributes}
        >
            <g
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                clipPath="url(#clip0_2046_12813)"
            >
                <path d="M6.066 25.896h12.768a4.47 4.47 0 0 0 2.833-1.012l8.627-7.062a2.094 2.094 0 0 0 .322-2.915c-.726-.923-2.095-1.045-3.004-.302l-6.259 5.113"></path>
                <path d="M12.637 20.803h6.824a2.094 2.094 0 0 0 0-4.189h-3.68a9.7 9.7 0 0 1-3.093-.492 8.5 8.5 0 0 0-2.684-.424c-2.363 0-4.063.916-4.063.916M.938 16.614v11.74H5.94v-11.74z"></path>
                <path d="M20.208 14.808A5.953 5.953 0 1 0 11.79 6.39a5.953 5.953 0 0 0 8.418 8.42"></path>
                <path d="m14.035 10.62 1.296 1.296 2.634-2.635"></path>
            </g>
            <defs>
                <clipPath id="clip0_2046_12813">
                    <path fill="#fff" d="M0 .5h32v32H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};


export const SeoHowWeWork2: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 140 141"
            className="w-20 h-20 md:w-[140px] md:h-[140px]"
            {...attributes}
        >
            <mask
                id="mask0_2115_6203"
                width="140"
                height="141"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style={{ maskType: "luminance" }}
            >
                <path fill="#fff" d="M0 .5h140v140H0z"></path>
            </mask>
            <g strokeMiterlimit="10" mask="url(#mask0_2115_6203)">
                <path
                    stroke="#FF2B44"
                    d="M111.016 21.008h24.882V4.6h-24.882v32.813M127.422 54.094c0 9.06-7.345 16.406-16.406 16.406s-16.407-7.345-16.407-16.406 7.346-16.68 16.407-16.68 16.406 7.619 16.406 16.68ZM36.914 119.992c0 9.061-7.345 16.406-16.406 16.406s-16.406-7.345-16.406-16.406 7.345-16.406 16.406-16.406 16.406 7.345 16.406 16.406Z"
                ></path>
                <path
                    stroke="#000"
                    d="M20.508 103.586V78.703c0-13.591 11.018-24.61 24.61-24.61h33.085"
                ></path>
                <path
                    stroke="#000"
                    d="m65.898 41.79 12.305 12.304-12.305 12.304M70 87.18l24.61 24.609M94.61 87.18 70 111.789M12.305 4.875l24.61 24.61M36.914 4.875l-24.61 24.61"
                ></path>
            </g>
        </svg>
    );
};

export const SeoHowWeWork3: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 md:w-[140px] md:h-[140px]"
            fill="none"
            viewBox="0 0 140 141"
            {...attributes}
        >
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M83.945 83.263H46.863a2.636 2.636 0 0 1-2.636-2.636v-9.282a2.636 2.636 0 0 1 2.636-2.636h37.082a2.636 2.636 0 0 1 2.635 2.636v9.282a2.636 2.636 0 0 1-2.635 2.636M60.605 75.986h-7.83M83.945 97.817H46.863a2.636 2.636 0 0 1-2.636-2.636v-9.282a2.636 2.636 0 0 1 2.636-2.636h37.082a2.636 2.636 0 0 1 2.635 2.636v9.282a2.636 2.636 0 0 1-2.635 2.636"
            ></path>
            <circle
                cx="52.775"
                cy="90.54"
                r="2.051"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            ></circle>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M69.054 112.371H46.862a2.636 2.636 0 0 1-2.635-2.636v-9.282a2.636 2.636 0 0 1 2.636-2.636h37.082a2.636 2.636 0 0 1 2.635 2.636v9.282a2.636 2.636 0 0 1-2.635 2.636H78.66"
            ></path>
            <circle
                cx="52.775"
                cy="105.095"
                r="2.051"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            ></circle>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M52.777 47.088a4.062 4.062 0 1 0 0-8.123 4.062 4.062 0 0 0 0 8.123M52.777 68.71V47.089M19.313 41.901c.868-17.793 15.567-31.95 33.575-31.95 13.246 0 24.703 7.658 30.18 18.793M122.38 51.49c8.627.17 15.569 7.217 15.569 15.885 0 8.777-7.115 15.89-15.889 15.89H17.94c-8.774 0-15.89-7.113-15.89-15.89 0-8.775 7.116-15.89 15.89-15.89.785 0 1.559.06 2.313.17"
            ></path>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M2.05 67.375c0-8.775 7.115-15.89 15.89-15.89 6.33 0 11.797 3.702 14.351 9.059M98.077 72.676c13.547 0 24.529-10.983 24.529-24.53s-10.982-24.53-24.53-24.53c-13.547 0-24.53 10.983-24.53 24.53s10.983 24.53 24.53 24.53M86.582 105.094h18.687"
            ></path>
            <path
                stroke="#FF2B44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M108.211 41.795a12 12 0 0 1 1.807 6.351c0 6.655-5.395 12.051-12.05 12.051-1.597 0-3.12-.31-4.515-.874"
            ></path>
            <path
                stroke="#FF2B44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="m105.734 47.4 2.476-5.605 5.606 2.476M87.726 54.498a12 12 0 0 1-1.808-6.352c0-6.655 5.395-12.05 12.05-12.05 1.641 0 3.206.328 4.632.922"
            ></path>
            <path
                stroke="#FF2B44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="m90.2 48.892-2.475 5.606-5.606-2.476"
            ></path>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M129.552 131.049h-20.02a3.796 3.796 0 0 1-3.796-3.796v-25.64c0-2.096 1.7-3.796 3.796-3.796h15.958l7.858 10.623v18.813c0 2.097-1.7 3.796-3.796 3.796"
            ></path>
            <circle
                cx="113.117"
                cy="105.2"
                r="2.051"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            ></circle>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M125.963 123.666h-12.846M125.963 116.234h-12.846"
            ></path>
        </svg>
    );
};

export const SeoHowWeWork4: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 md:w-[140px] md:h-[140px]"
            fill="none"
            viewBox="0 0 140 141"
            {...attributes}
        >
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M28.69 108.327H8.204a4.1 4.1 0 0 1-4.101-4.101V8.703a4.1 4.1 0 0 1 4.101-4.101h123.594a4.1 4.1 0 0 1 4.101 4.101v95.523a4.1 4.1 0 0 1-4.101 4.101h-20.333M60.846 108.327H45.623M94.42 108.327H77.935"
            ></path>
            <path
                stroke="#FF2B44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M69.049 53.833a8.203 8.203 0 1 0 0-16.406 8.203 8.203 0 0 0 0 16.406M36.895 70.096a8.203 8.203 0 1 0 0-16.407 8.203 8.203 0 0 0 0 16.407M102.621 59.552a8.203 8.203 0 0 0 8.203-8.203 8.203 8.203 0 1 0-8.203 8.203"
            ></path>
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M135.898 21.097H4.102M119.487 136.398H20.514M94.445 136.398H110.8V82.285H94.445zM61.58 136.398h16.354V76.625H61.58zM28.717 136.398H45.07V92.792H28.717z"
            ></path>
            <path
                stroke="#FF2B44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="m45.623 57.477 15.223-7.699M93 49.71 78.275 47.2"
            ></path>
        </svg>
    );
};

export const SeoHowWeWork5: FC<IconProps> = ({
    ...attributes
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 md:w-[140px] md:h-[140px]"
            fill="none"
            viewBox="0 0 140 141"
            {...attributes}
        >
            <g clipPath="url(#clip0_2115_6365)">
                <mask
                    id="mask0_2115_6365"
                    width="140"
                    height="140"
                    x="0"
                    y="1"
                    maskUnits="userSpaceOnUse"
                    style={{ maskType: "luminance" }}
                >
                    <path fill="#fff" d="M0 1h140v140H0z"></path>
                </mask>
                <g strokeMiterlimit="10" mask="url(#mask0_2115_6365)">
                    <path
                        stroke="#FF2B44"
                        d="M41.317 67.952a24.47 24.47 0 0 1-4.13-13.632c0-13.57 11.04-24.61 24.61-24.61 11.338 0 20.91 7.708 23.752 18.158"
                    ></path>
                    <path
                        stroke="#FF2B44"
                        d="M100.592 41.037a41.3 41.3 0 0 0-4.612-9.299l6.42-6.42-11.6-11.602-6.422 6.42C80.077 17.287 75.226 15.2 70 14.134V5.101H53.594v9.032c-5.226 1.066-10.077 3.152-14.379 6.004l-6.42-6.421-11.602 11.601 6.42 6.421c-2.85 4.302-4.937 9.152-6.003 14.379h-9.032v16.406h9.032a40.5 40.5 0 0 0 4.682 12.25"
                    ></path>
                    <path
                        stroke="#000"
                        d="M132.006 28.6 1.656 85.99M119.328 22.107l15.417 5.61-5.611 15.418M0 136.898h140M61.797 136.898V95.883H45.39v41.015M94.607 136.898V79.477H78.201v57.421M127.422 136.898v-82.03h-16.406v82.03M28.984 136.898v-24.609H12.578v24.609"
                    ></path>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2115_6365">
                    <path fill="#fff" d="M0 .5h140v140H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};