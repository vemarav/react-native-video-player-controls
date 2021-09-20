import React from 'react';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 20h9v-9h-1v8h-8v1zm0-19h8v7h1V0h-9v1zM8 0v1H1v7H0V0h8zm0 19v1H0v-9h1v8h7z"
                fill={color ?? '#ffffff'}
            />
        </Svg>
    );
};

export default component;
