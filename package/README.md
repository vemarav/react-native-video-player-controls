# react-native-video-ui-controls

A simple video controls build on top of react-native-video

# Demo

1 | 2 | 3
--|--|--
![1](https://raw.githubusercontent.com/vemarav/react-native-video-ui-controls/main/screens/1.png) | ![2](https://raw.githubusercontent.com/vemarav/react-native-video-ui-controls/main/screens//2.png)| ![3](https://raw.githubusercontent.com/vemarav/react-native-video-ui-controls/main/screens/3.png)

# Usage

```js
import React from 'react';
import {Platform, View} from 'react-native';
import Video from 'react-native-video-ui-controls';

const component = (props: any) => {
    const {name, source} = props.route.params;

    return (
        <View style={{flex: 1}}>
            <Video
                name={name}
                source={source}
                onBackPress={() => {
                    props.navigation.goBack();
                }}
                isFullscreen={Platform.OS === 'ios'}
            />
        </View>
    );
};

export default component;

```
