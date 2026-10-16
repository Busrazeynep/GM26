import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');
const SLIDE_WIDTH = width;
const SLIDE_HEIGHT = height * 0.65;

// Görsel için padding — küçültünce görsel büyür
const IMAGE_PADDING = -18;

type AIFeature = {
  id: string;
  image: ReturnType<typeof require>;
};

const aiFeatures: AIFeature[] = [
  { id: 'welcome', image: require('../../gmaiimages/welcome.png') },
  { id: 'visual',  image: require('../../gmaiimages/GM AI cat.png') },
  { id: 'team',    image: require('../../gmaiimages/GM AI team.png') },
  { id: 'photo',   image: require('../../gmaiimages/GM AI photo editor.png') },
  { id: 'text',    image: require('../../gmaiimages/GM AI text assistant.png') },
  { id: 'call',    image: require('../../gmaiimages/GM AI call asistant.png') },
];

export const GMAIDetailsScreen = () => {
  const navigation = useNavigation();
  const { colors, mode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<AIFeature>>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index ?? 0);
    },
    [],
  );
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(aiFeatures.length - 1, index));
    flatListRef.current?.scrollToIndex({ index: clamped, animated: true });
    setActiveIndex(clamped);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    glowBg: {
      position: 'absolute',
      borderRadius: 1000,
      zIndex: -1,
    },
    glowTop: {
      width: 400,
      height: 400,
      top: '-10%',
      left: '-20%',
      backgroundColor: colors.purple,
      opacity: mode === 'dark' ? 0.15 : 0.05,
      shadowColor: colors.purple,
      shadowRadius: 100,
      shadowOpacity: 0.8,
    },
    glowBottom: {
      width: 400,
      height: 400,
      bottom: '-10%',
      right: '-20%',
      backgroundColor: colors.accent,
      opacity: mode === 'dark' ? 0.1 : 0.05,
      shadowColor: colors.accent,
      shadowRadius: 100,
      shadowOpacity: 0.6,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 24,
      marginBottom: 8,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      flex: 1,
      color: colors.text,
      textTransform: 'uppercase',
      fontSize: 18,
      letterSpacing: 2,
    },
    accentLine: {
      height: 1.5,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 1,
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
    accentLineInner: {
      flex: 1,
      backgroundColor: '#a855f7',
      opacity: 0.45,
    },
    carouselWrapper: {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    },
    slide: {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: IMAGE_PADDING,
      paddingTop: 8,
    },
    // Görsel padding ile küçük bir margin bırakarak daha büyük görünür
    featureImage: {
      width: SLIDE_WIDTH - IMAGE_PADDING * 2,  // yanlarda küçük boşluk
      height: SLIDE_WIDTH - IMAGE_PADDING * 2, // kare olduğu için aynı
      resizeMode: 'contain',
    },
    tapOverlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      zIndex: 10,
    },
    tapLeft:  { flex: 4 },
    tapRight: { flex: 6 },
    bottomNav: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingBottom: 24,
    },
    thumbRow: {
      flexDirection: 'row',
      gap: 6,
      paddingHorizontal: 10,
    },
    thumb: {
      flex: 1,
      height: 60,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    thumbActive: {
      borderColor: '#a855f7',
    },
    thumbDim: {
      opacity: 0.4,
    },
    thumbImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    dot: {
      height: 5,
      borderRadius: 3,
      backgroundColor: '#333',
    },
    dotActive: {
      width: 18,
      backgroundColor: '#a855f7',
    },
    dotInactive: {
      width: 5,
    },
    counter: {
      fontSize: 11,
      color: '#555',
      letterSpacing: 1,
    },
    counterActive: {
      color: '#a855f7',
    },
  });

  const renderItem = ({ item }: { item: AIFeature }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.featureImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.glowBg, styles.glowTop]} />
      <View style={[styles.glowBg, styles.glowBottom]} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        <Text style={[typography.h3, styles.title]}>GM AI ÖZELLİKLERİ</Text>
      </View>

      {/* Accent line */}
      <View style={styles.accentLine}>
        <View style={styles.accentLineInner} />
      </View>

      {/* Carousel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={aiFeatures}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
          getItemLayout={(_, index) => ({
            length: SLIDE_WIDTH,
            offset: SLIDE_WIDTH * index,
            index,
          })}
        />

        {/* Story tap overlay */}
        <View style={styles.tapOverlay} pointerEvents="box-none">
          <Pressable style={styles.tapLeft}  onPress={() => goTo(activeIndex - 1)} />
          <Pressable style={styles.tapRight} onPress={() => goTo(activeIndex + 1)} />
        </View>
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.thumbRow}>
          {aiFeatures.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.thumb,
                index === activeIndex ? styles.thumbActive : styles.thumbDim,
              ]}
              onPress={() => goTo(index)}
              activeOpacity={0.7}
            >
              <Image source={feature.image} style={styles.thumbImage} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dotRow}>
          {aiFeatures.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => goTo(index)} hitSlop={8}>
              <View
                style={[
                  styles.dot,
                  index === activeIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.counter}>
          <Text style={styles.counterActive}>{activeIndex + 1}</Text>
          {' / '}{aiFeatures.length}
        </Text>
      </View>
    </View>
  );
};