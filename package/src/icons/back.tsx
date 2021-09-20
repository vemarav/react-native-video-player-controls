import React from 'react';
import {Platform} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    if (Platform.OS === 'ios') {
        return (
            <Svg width={size} height={size} viewBox="0 0 11 20" fill="none">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.945.308a.92.92 0 00-1.374 0L.375 9.187a1.012 1.012 0 00-.09.086 1.115 1.115 0 000 1.489l8.243 8.93a.92.92 0 001.374 0c.38-.411.38-1.078 0-1.489l-7.551-8.18 7.594-8.226c.38-.411.38-1.078 0-1.489z"
                    fill={color ?? '#ffffff'}
                />
            </Svg>
        );
    }
    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.571.308a.92.92 0 011.374 0c.38.411.38 1.078 0 1.489l-6.7 7.259h15.703a1.052 1.052 0 010 2.104H3.4l6.502 7.043c.38.411.38 1.078 0 1.489a.92.92 0 01-1.374 0l-8.243-8.93a1.115 1.115 0 010-1.489c.028-.03.059-.06.09-.086L8.571.308z"
                fill={color ?? '#ffffff'}
            />
        </Svg>
    );
};

export default component;
