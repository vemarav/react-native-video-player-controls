import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const component = ({color, size = 20}: {color?: string; size?: number}) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <Path fill={color ?? '#ffffff'} d="M12 1H14V19H12z" />
            <Path fill={color ?? '#ffffff'} d="M6 1H8V19H6z" />
        </Svg>
    );
};

export default component;
