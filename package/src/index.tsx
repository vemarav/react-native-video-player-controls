import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import {
    Back,
    Backward,
    Forward,
    Fullscreen,
    Original,
    Play,
    Pause,
} from './icons';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation';

import {getTime, getValue} from './utils';

const colors = {
    main: '#ffffff',
    controls: '#272727',
    unplayed: '#ffffff50',
};

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

interface IComponent {
    source:
        | {
              uri?: string | undefined;
              headers?: {[key: string]: string} | undefined;
              type?: string | undefined;
          }
        | number;
    name?: string;
    tapToseek?: number;
    onBackPress?: () => void;
    backIcon?: JSX.Element;
    onLoad?: (props: any) => void;
    onLoadStart?: () => void;
    onBuffer?: (props: any) => void;
    onOrientationChange?: (props: any) => void;
    isFullscreen?: boolean;
}

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const component = (props: IComponent) => {
    const {
        source,
        name,
        onLoad: onExtLoad,
        onLoadStart: onExtLoadStart,
        backIcon,
        onBackPress,
        onBuffer: onExtBuffer,
        tapToseek = 10,
        onOrientationChange,
        isFullscreen = false,
    } = props;
    const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
    const player: React.RefObject<Video> = useRef(null);
    const sliderAt = new Animated.Value(0);
    const [paused, setPaused] = useState(false);
    const [controls, setControls] = useState(true);
    const [duration, setDuration] = useState(0);
    const [playedTime, setPlayedTime] = useState(0);
    const [sliding, setSliding] = useState({paused: false});
    const [fullscreen, setFullscreen] = useState(isFullscreen);
    const [playbackModal, setPlaybackModal] = useState(false);
    const [speed, setSpeed] = useState(1);

    sliderAt.addListener(({value}) => {
        setPlayedTime(value * duration);
    });

    useEffect(() => {
        if (isFullscreen) {
            Orientation.lockToLandscape();
        }
        return () => {
            Orientation.lockToPortrait();
            sliderAt?.removeAllListeners();
        };
    }, []);

    const toggle = () => {
        setControls(!controls);
    };

    const onLoad = (props: {duration: number}) => {
        setDuration(props.duration);
        onExtLoad && onExtLoad(props);
    };

    const onLoadStart = () => {
        onExtLoadStart && onExtLoadStart();
    };

    const onBuffer = (props: any) => {
        onExtBuffer && onExtBuffer(props);
    };

    const onProgress = ({currentTime}: {currentTime: number}) => {
        const progress = currentTime / duration;
        sliderAt.setValue(Number.isNaN(progress) ? 0 : progress);
    };

    const backward = () => {
        player.current?.seek(playedTime - tapToseek);
    };

    const play = () => {
        if (getValue(sliderAt) === duration) player.current?.seek(0);
        setPaused(!paused);
    };

    const forward = () => {
        player.current?.seek(playedTime + tapToseek);
    };

    const onSlidingStart = (start: number) => {
        setSliding({paused});
        setPaused(true);
    };

    const onValueChange = (value: number) => {
        setPlayedTime(value * duration);
        player.current?.seek(value * duration, 0.5);
    };

    const onSlidingComplete = (end: number) => {
        setPaused(sliding.paused);
        sliderAt.setValue(end);
        player.current?.seek(end * duration, 0.5);
    };

    const turnToFullscreen = () => {
        if (fullscreen) {
            setFullscreen(!fullscreen);
            Orientation.lockToPortrait();
            onOrientationChange &&
                onOrientationChange({
                    fullscreen: !fullscreen,
                    orientation: 'PORTRAIT',
                });
        } else {
            Orientation.lockToLandscape();
            setFullscreen(!fullscreen);
            onOrientationChange &&
                onOrientationChange({
                    fullscreen: !fullscreen,
                    orientation: 'LANDSCAPE',
                });
        }
    };

    const onSelectSpeed = (playbackSpeed: number) => {
        setSpeed(playbackSpeed);
        setPlaybackModal(false);
    };

    return (
        <View style={styles.container}>
            <Video
                repeat
                ref={player}
                rate={speed}
                paused={paused}
                onLoad={onLoad}
                source={source}
                style={styles.video}
                resizeMode={'contain'}
                fullscreen={fullscreen}
                onProgress={onProgress}
                onError={console.error}
                onLoadStart={onLoadStart}
                onBuffer={onBuffer}
            />
            <TouchableWithoutFeedback style={styles.toggle} onPress={toggle}>
                <View style={styles.controls}>
                    {controls ? (
                        <>
                            <View style={styles.top}>
                                <View style={styles.topLayout}>
                                    <TouchableOpacity
                                        style={styles.backContainer}
                                        onPress={onBackPress}>
                                        {backIcon ? backIcon : <Back />}
                                    </TouchableOpacity>
                                    <Text style={styles.name} numberOfLines={1}>
                                        {name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.centerLayout}>
                                <TouchableOpacity
                                    onPress={backward}
                                    style={styles.centerButton}>
                                    <Backward />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={play}
                                    style={[
                                        styles.centerButton,
                                        !paused ? styles.none : styles.play,
                                    ]}>
                                    {!paused ? (
                                        <Pause size={28} />
                                    ) : (
                                        <Play size={32} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={forward}
                                    style={styles.centerButton}>
                                    <Forward />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottom}>
                                <View style={[styles.bottomLayout]}>
                                    <Text style={styles.time}>
                                        {getTime(playedTime)}
                                    </Text>
                                    <AnimatedSlider
                                        value={sliderAt}
                                        onSlidingStart={onSlidingStart}
                                        onSlidingComplete={onSlidingComplete}
                                        onValueChange={onValueChange}
                                        style={styles.slider}
                                        thumbTintColor={colors.main}
                                        minimumTrackTintColor={colors.main}
                                        maximumTrackTintColor={colors.unplayed}
                                    />
                                    <Text style={styles.time}>
                                        {getTime(duration - playedTime)}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.speed}
                                        onPress={() => setPlaybackModal(true)}>
                                        <Text style={styles.time}>
                                            {speed}x
                                        </Text>
                                    </TouchableOpacity>
                                    {isFullscreen ? null : (
                                        <TouchableOpacity
                                            style={styles.fullscreen}
                                            onPress={turnToFullscreen}>
                                            {fullscreen ? (
                                                <Original />
                                            ) : (
                                                <Fullscreen />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
            <Modal
                style={{height: 2 * SCREEN_WIDTH}}
                animationType="slide"
                visible={playbackModal}
                transparent
                onRequestClose={() => setPlaybackModal(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => setPlaybackModal(false)}>
                        <View style={styles.halfscreen} />
                    </TouchableWithoutFeedback>
                    <ScrollView
                        style={[styles.halfscreen, styles.sheet]}
                        contentContainerStyle={styles.sheetContainer}>
                        <View style={styles.playbackSpeed}>
                            <Text style={styles.name}>Playback Speed</Text>
                        </View>
                        {playbackSpeeds.map(playbackSpeed => (
                            <TouchableOpacity
                                key={`${playbackSpeed}x`}
                                style={styles.playbackSpeed}
                                onPress={() => onSelectSpeed(playbackSpeed)}>
                                <Text
                                    style={[
                                        styles.name,
                                        speed === playbackSpeed
                                            ? styles.selected
                                            : styles.unselected,
                                    ]}>
                                    {playbackSpeed}x
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default component;

const styles = StyleSheet.create({
    none: {},
    container: {
        flex: 1,
    },
    video: {
        flex: 1,
        backgroundColor: '#000000',
    },
    toggle: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
    },
    topLayout: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.controls,
    },
    backContainer: {
        width: 30,
        height: 30,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerLayout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
    },
    centerButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.controls,
    },
    play: {
        paddingLeft: 4,
    },
    bottom: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    bottomLayout: {
        height: 50,
        backgroundColor: colors.controls,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    name: {
        color: colors.main,
        fontSize: 14,
        marginRight: 30,
    },
    time: {
        color: colors.main,
        fontSize: 14,
    },
    slider: {
        flex: 1,
    },
    fullscreen: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
    },
    halfscreen: {
        flex: 1,
    },
    sheet: {
        backgroundColor: colors.controls,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    sheetContainer: {
        paddingVertical: 10,
    },
    playbackSpeed: {
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    unselected: {
        opacity: 0.7,
    },
    selected: {
        fontWeight: 'bold',
    },
    speed: {
        padding: 15,
    },
});
