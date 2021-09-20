import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import Video from './src';

const component = (props: any) => {
    const {name, source} = props.route.params;
    const [fullscreen, setFullscreen] = useState(false);

    const video = (
        <Video
            name={name}
            source={source}
            onBackPress={() => {
                props.navigation.goBack();
            }}
        />
    );

    return <View style={{flex: 1}}>{video}</View>;
};

export default component;
