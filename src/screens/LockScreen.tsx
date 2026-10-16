import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';

export const LockScreen = () => {
  const navigation = useNavigation<any>();

  const player = useVideoPlayer(require('../../assets/gm26_video.mp4'), (p) => {
    p.loop = true;
    p.muted = false;
    p.play();
  });

  const handleStart = () => {
    player.pause();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.bottomContainer}>
        <Pressable
          style={({ pressed }) => [styles.outlineButton, pressed && styles.buttonPressed]}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>BAŞLA</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  outlineButton: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 6,
  },
});