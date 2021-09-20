import React from 'react';
import { View,Text,TouchableOpacity, StyleSheet} from 'react-native';
import Routes from './Routes';

const component = (props: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => {
                props.navigation.navigate(Routes.video, {name: 'Earth Rotation Video', source: require('./assets/video.mp4')})
            }}>
                <Text style={styles.text}>
                    Earth Video
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {
                props.navigation.navigate(Routes.video, {name: 'WebRTC on Android using react-native', source: require('./assets/video2.mp4')})
            }}>
                <Text style={styles.text}>
                    WebRTC on Android using react-native
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default component;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
    },
    text: {
        color: '#000000',
        fontSize: 14,
    }
});