import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Cpu, Camera, Monitor, Lock, Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import * as NavigationBar from 'expo-navigation-bar';


// -------------------------------------------------------------------
// FeatureCard - Isolated component so hooks are NOT called in a loop
// -------------------------------------------------------------------
type FeatureCardProps = {
  id: string;
  title: string;
  icon: any;
  color: string;
  route: string;
};

const FeatureCard = ({ title, icon: Icon, color, route }: FeatureCardProps) => {
  const navigation = useNavigation<any>();
  const { colors, mode } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 4000, useNativeDriver: true, easing: Easing.linear })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const getIconBg = () => {
    if (mode === 'light') return color + '22';
    return color + '1a';
  };

  const cardStyle = StyleSheet.create({
    wrapper: { flex: 1 },
    outer: { borderRadius: 30, overflow: 'hidden', backgroundColor: 'rgba(128,128,128,0.08)', height: 85, marginTop: 8 },
    glowLayer: { position: 'absolute', top: -50, left: -50, right: -50, bottom: -50, opacity: 0.6 },
    card: {
      backgroundColor: colors.surface, paddingHorizontal: 8, alignItems: 'center',
      height: 85, justifyContent: 'center',
      shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: mode === 'light' ? 0.15 : 0.5, shadowRadius: 10,
    },
    iconBox: {
      width: 36, height: 36, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 3
    },
    title: { fontSize: 10, fontWeight: '800', textAlign: 'center', lineHeight: 14, letterSpacing: 0.6 },
  });

  return (
    <Pressable
      style={({ pressed }) => [cardStyle.wrapper, { transform: [{ scale: pressed ? 0.96 : 1 }] }]}
      onPress={() => navigation.navigate(route)}
    >
      <View style={cardStyle.outer}>
        <Animated.View style={[cardStyle.glowLayer, { transform: [{ rotate: spin }] }]}>
          <LinearGradient
            colors={['transparent', color, 'transparent', color, 'transparent']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        <View style={cardStyle.card}>
          <Animated.View
            style={[cardStyle.iconBox, {
              borderColor: color,
              backgroundColor: getIconBg(),
            }]}
          >
            <Icon size={20} color="#ffffff" strokeWidth={1.5} />
          </Animated.View>
          <Text style={[cardStyle.title, { color: '#ffffff' }]}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

// -------------------------------------------------------------------
// HomeScreen
// -------------------------------------------------------------------
export const HomeScreen = () => {

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  const navigation = useNavigation<any>();
  const { colors, mode, toggleTheme } = useTheme();

  const features: FeatureCardProps[] = [
    { id: 'Design', title: 'Tasarım ', icon: Monitor, color: '#A78BFA', route: 'Design' },
    { id: 'Camera', title: 'Kamera ', icon: Camera, color: '#2DD4BF', route: 'Camera' },
    { id: 'Performance', title: 'Performans', icon: Cpu, color: '#60A5FA', route: 'Performance' },
  ];

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
    scrollContent: { flexGrow: 1, paddingBottom: 10 },
    glowBg: { position: 'absolute', borderRadius: 1000, zIndex: -1 },
    glowTop: {
      width: 350, height: 350, top: '10%', left: '50%', marginLeft: -175,
      backgroundColor: colors.purple, opacity: mode === 'light' ? 0.08 : 0.2,
      shadowColor: colors.purple, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 100,
    },
    glowRight: {
      width: 250, height: 250, top: '25%', right: -80,
      backgroundColor: colors.accent, opacity: mode === 'light' ? 0.07 : 0.15,
      shadowColor: colors.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 80,
    },
    navigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, paddingTop: 10 },
    navBrand: { flexDirection: 'row' },
    brandText: { fontSize: 20, fontWeight: '900', color: colors.text, letterSpacing: 2 },
    brandAccent: { color: colors.accent, marginLeft: 6 },
    navButtons: { flexDirection: 'row', gap: 10 },
    menuButton: {
      width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface,
      justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border,
    },
    heroSection: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 0 },
    headline: { marginBottom: 25, alignItems: 'center' },
    headlineMain: { fontSize: 56, fontWeight: '900', color: colors.text, textAlign: 'center', lineHeight: 64, marginBottom: 0, letterSpacing: -1 },
    headlineAccent: {
      color: colors.accent,
      textShadowColor: colors.accent, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 15,
    },
    subheadline: { fontSize: 13, fontWeight: '800', color: colors.textSecondary, letterSpacing: 5, textTransform: 'uppercase' },
    productContainer: { width: '100%', maxWidth: 300, height: 400, marginBottom: 20, alignSelf: 'center', position: 'relative' },
    productImage: {
      width: '100%', height: '100%', borderRadius: 48, borderWidth: 1, borderColor: colors.border,
      shadowColor: colors.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 15,
    },
    productGlow: {
      position: 'absolute', bottom: -10, right: -10, width: 80, height: 80, borderRadius: 40,
      backgroundColor: colors.accent, opacity: 0.2,
      shadowColor: colors.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 50,
    },
    featuresGrid: { flexDirection: 'row', marginBottom: 10, gap: 12 },
    buttonContainer: { paddingHorizontal: 24 },
    ctaButton: {
      width: '100%', paddingVertical: 20, backgroundColor: colors.text, borderRadius: 30, alignItems: 'center', justifyContent: 'center',
      shadowColor: colors.text, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 8,
    },
    ctaButtonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
    ctaButtonText: { fontSize: 15, fontWeight: '900', color: colors.background, letterSpacing: 2, textTransform: 'uppercase' },
  });

  return (
    <View style={s.container}>
      <View style={[s.glowBg, s.glowTop]} />
      <View style={[s.glowBg, s.glowRight]} />

      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <View style={s.navigation}>
          <View style={s.navBrand}>
            <Image
              source={mode === 'dark' ? require('../../GM 26 Pro/GM_beyaz.png') : require('../../GM 26 Pro/GM_siyah.png')}
              style={{ width: 140, height: 60 }}
              resizeMode="contain"
            />
          </View>
          <View style={s.navButtons}>
            {/* Lock */}
            <Pressable
              style={s.menuButton}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Lock' }] })}
            >
              <Lock size={20} color={colors.accent} />
            </Pressable>
          </View>
        </View>

        {/* Hero Section */}
        <View style={s.heroSection}>
          <View style={s.headline}>
            <Image
              source={require('../../GM 26 Pro/26gmhome.png')}
              style={{
                marginTop: -10,
                width: 280,
                height: 90,
                marginBottom: -10,
                tintColor: mode === 'dark' ? '#ffffff' : undefined
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginTop: -30 }}>
            <Image
              source={require('../../GM 26 Pro/tasarimilk.png')}
              resizeMode="stretch"
              style={{ width: 330, height: undefined, aspectRatio: 260 / 260, borderRadius: 26 }}
            />
          </View>

          <View style={s.featuresGrid}>
            {features.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </View>

          <Pressable onPress={() => navigation.navigate('GMAIDetails')}>
            <Image
              source={require('../../GM 26 Pro/demo_mode_homeAI.png')}
              resizeMode="cover"
              style={{ width: 330, height: 180, borderRadius: 30, marginBottom: 10 }}
            />
          </Pressable>

        </View>

        {/* CTA Button */}
        <View style={s.buttonContainer}>
        </View>
      </ScrollView>
    </View>
  );
};