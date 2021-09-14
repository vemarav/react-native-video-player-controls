import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Alert} from 'react-native';
import Video from 'react-native-video';

const component = (props: any) => {
    const [controls, setControls] = useState(true);

    // https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4
    return (
        <View style={{flex: 1}}>
            <Video
                style={{
                    flex: 1,
                    backgroundColor: '#000000',
                }}
                resizeMode={'contain'}
                fullscreen
                fullscreenAutorotate
                fullscreenOrientation={'landscape'}
                source={{
                    uri: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4',
                }}
                onError={console.error}
            />
            <TouchableWithoutFeedback
                style={{
                    ...StyleSheet.absoluteFillObject,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => setControls(!controls)}>
                <View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {controls ? (
                        <>
                            <View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    justifyContent: 'flex-start',
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        backgroundColor: 'red',
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: '#ffffff40',
                                }}
                            />
                            <View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    justifyContent: 'flex-end',
                                }}>
                                <View
                                    style={{
                                        height: 100,
                                        backgroundColor: 'blue',
                                    }}
                                />
                            </View>
                        </>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default component;
