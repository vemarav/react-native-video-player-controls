import React from 'react';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 18 20" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.945.308a.92.92 0 00-1.374 0L.375 9.187a1.012 1.012 0 00-.09.086 1.115 1.115 0 000 1.489l8.243 8.93a.92.92 0 001.374 0c.38-.411.38-1.078 0-1.489l-7.551-8.18 7.594-8.226c.38-.411.38-1.078 0-1.489z"
                fill={color ?? '#ffffff'}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.945.308a.92.92 0 00-1.374 0L7.375 9.187a1.012 1.012 0 00-.09.086 1.115 1.115 0 000 1.489l8.243 8.93a.92.92 0 001.374 0c.38-.411.38-1.078 0-1.489l-7.551-8.18 7.594-8.226c.38-.411.38-1.078 0-1.489z"
                fill={color ?? '#ffffff'}
            />
        </Svg>
    );
};

export default component;
