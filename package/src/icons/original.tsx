import React from 'react';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.5 8v1.5h9v-9H8V8H.5zm11-7.5H13V8h7.5v1.5h-9v-9zm9 11h-9v9H13V13h7.5v-1.5zm-11 9v-9h-9V13H8v7.5h1.5z"
                fill={color ?? '#ffffff'}
            />
        </Svg>
    );
};

export default component;
