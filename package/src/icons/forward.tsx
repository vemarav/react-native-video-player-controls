import React from 'react';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 18 20" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.285 19.692a.92.92 0 001.374 0l8.196-8.879a1.115 1.115 0 00.09-1.575L1.702.308a.92.92 0 00-1.374 0 1.115 1.115 0 000 1.489l7.551 8.18-7.594 8.226a1.115 1.115 0 000 1.489z"
                fill={color ?? '#ffffff'}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.285 19.692a.92.92 0 001.374 0l8.196-8.879a1.115 1.115 0 00.09-1.575L8.702.308a.92.92 0 00-1.374 0 1.115 1.115 0 000 1.489l7.551 8.18-7.594 8.226a1.115 1.115 0 000 1.489z"
                fill={color ?? '#ffffff'}
            />
        </Svg>
    );
};

export default component;
