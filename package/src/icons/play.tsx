import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="#ffffff">
            <G clipPath="url(#clip0)">
                <Path
                    d="M18.2 10l-15 8.66V1.34l15 8.66z"
                    fill={color ?? '#ffffff'}
                />
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Path fill="#ffffff" d="M0 0H20V20H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default component;
