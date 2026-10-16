import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Shield, Droplets, Layers, Zap } from 'lucide-react-native';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLOR_OPTIONS = [
  {
    id: 'silver',
    name: 'Gümüş',
    dot: '#c8c8c8',
    image: require('../../GM 26 Pro/26gumusrenk.png'),
  },
  {
    id: 'black',
    name: 'Siyah',
    dot: '#2a2a2e',
    image: require('../../GM 26 Pro/26siyahrenk.png'),
  },
];

const CARDS = [
  {
    id: 'ekran',
    sectionTitle: 'Ekran Özellikleri',
    badge: 'Ekran',
    badgeBg: 'rgba(55,138,221,0.18)',
    badgeColor: '#378add',
    cardBg: 'rgba(55,138,221,0.05)',
    cardBorder: 'rgba(55,138,221,0.2)',
    desc: '6.75" HD+ geniş ekranı ve 120Hz ekran yenileme hızı ile daha akıcı ve keyifli bir izleme deneyimi sunar.',
    image: require('../../GM 26 Pro/26ekran.png'),
    imageHeight: 360,
    autoHeight: false,
    resizeMode: 'stretch' as const,
    imageBg: '#0a0a14',
  },
  {
    id: 'ironguard',
    sectionTitle: 'Ekran Koruması',
    badge: 'Koruma',
    badgeBg: 'rgba(29,158,117,0.18)',
    badgeColor: '#1d9e75',
    cardBg: 'rgba(29,158,117,0.05)',
    cardBorder: 'rgba(29,158,117,0.2)',
    desc: 'Iron Guard teknolojisi ile güçlendirilen ekran, günlük kullanımda oluşabilecek çizilmelere karşı ekstra koruma sağlar.',
    image: require('../../GM 26 Pro/26ironguard.png'),
    imageHeight: 300,
  },
  {
    id: 'ip64',
    sectionTitle: 'IP64 Sertifikası',
    badge: 'Sertifika',
    badgeBg: 'rgba(212,83,126,0.18)',
    badgeColor: '#d4537e',
    cardBg: 'rgba(212,83,126,0.05)',
    cardBorder: 'rgba(212,83,126,0.2)',
    desc: 'IP64 koruması ile su sıçramalarına ve toza karşı dayanıklılık göstererek günlük kullanımda daha güvenli ve konforlu bir deneyim sunar.',
    image: require('../../GM 26 Pro/26ip64.png'),
    imageHeight: 360,
    resizeMode: 'contain' as const,
    imageBg: '#ffffff',
    imageBottomPadding: 16,
  },
  {
    id: 'dayaniklilik',
    sectionTitle: 'Dayanıklılık',
    badge: 'Dayanıklılık',
    badgeBg: 'rgba(239,159,39,0.18)',
    badgeColor: '#ef9f27',
    cardBg: 'rgba(239,159,39,0.05)',
    cardBorder: 'rgba(239,159,39,0.2)',
    desc: 'Geliştirilmiş dayanıklılık yapısı, günlük kullanımda oluşabilecek düşme ve darbelere karşı koruyarak daha güvenli bir deneyim yaşatır.',
    image: require('../../GM 26 Pro/26dayan.png'),
    imageHeight: 360,
    autoHeight: false,
    resizeMode: 'stretch' as const,
    imageBg: undefined,
  },
];

export const DesignScreen = () => {
  const navigation = useNavigation();
  const { colors, mode } = useTheme();
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const animVal = useRef(new Animated.Value(0)).current;
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  React.useEffect(() => {
    CARDS.forEach((card) => {
      if (card.autoHeight) {
        const src = Image.resolveAssetSource(card.image);
        if (src?.width && src?.height) {
          const ratio = src.height / src.width;
          setImageHeights((prev) => ({ ...prev, [card.id]: SCREEN_WIDTH * ratio }));
        }
      }
    });
  }, []);

  const handleColorSelect = (option: typeof COLOR_OPTIONS[0]) => {
    if (option.id === selectedColor.id) return;
    Animated.timing(animVal, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setSelectedColor(option);
      animVal.setValue(0);
    });
  };

  const imageOpacity = animVal.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    glowBg: {
      position: 'absolute',
      borderRadius: 1000,
      zIndex: -1,
    },
    glowCenter: {
      width: 600,
      height: 600,
      top: '15%',
      left: '50%',
      marginLeft: -300,
      backgroundColor: colors.accent,
      opacity: mode === 'dark' ? 0.08 : 0.04,
      shadowColor: colors.accent,
      shadowRadius: 200,
      shadowOpacity: 0.8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 24,
      marginBottom: 32,
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
      flexShrink: 0,
    },
    title: {
      letterSpacing: 2,
      flex: 1,
      color: colors.text,
      flexShrink: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 60,
    },
    sectionTitle: {
      letterSpacing: 1,
      marginBottom: 14,
      color: colors.text,
    },

    // ── COLOR PICKER CARD ──
    colorCard: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(139,92,246,0.35)',
      overflow: 'hidden',
      backgroundColor: mode === 'dark' ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)',
      marginBottom: 28,
    },
    colorImageWrap: {
      width: '100%',
      height: 320,
    },
    colorImage: {
      width: '100%',
      height: '100%',
    },
    colorBottom: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(139,92,246,0.25)',
    },
    pillToggle: {
      flexDirection: 'row',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      borderRadius: 30,
      padding: 3,
      marginBottom: 12,
    },
    pillOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingVertical: 9,
      borderRadius: 26,
    },
    pillOptionActive: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
    },
    pillDot: {
      width: 11,
      height: 11,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
    },
    pillLabel: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.4,
      color: mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
    },
    pillLabelActive: {
      color: mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
    },
    colorDesc: {
      fontSize: 13,
      color: colors.textSecondary,
      lineHeight: 21,
    },

    // ── STANDARD CARD ──
    card: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(139,92,246,0.35)',
      overflow: 'hidden',
      backgroundColor: mode === 'dark' ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)',
      marginBottom: 28,
    },
    cardImage: {
      width: '100%',
      height: 300,
    },
    cardBottom: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(139,92,246,0.25)',
    },
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 10,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: '700',
    },
    cardDesc: {
      fontSize: 13,
      color: colors.textSecondary,
      lineHeight: 21,
    },

    // ── SUMMARY LIST ──
    summaryCard: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(139,92,246,0.35)',
      overflow: 'hidden',
      backgroundColor: mode === 'dark' ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)',
      marginBottom: 28,
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(139,92,246,0.15)',
    },
    summaryRowLast: {
      borderBottomWidth: 0,
    },
    summaryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    summaryDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    summaryKey: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    summaryVal: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.glowBg, styles.glowCenter]} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={22} />
        </Pressable>
        {/* numberOfLines={1} ile tek satırda yan yana */}
        <Text style={[typography.h3, styles.title]} numberOfLines={1} adjustsFontSizeToFit>
          TASARIM VE DETAYLAR
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── TASARIM & RENK ── */}
        <Text style={[typography.h2, styles.sectionTitle]}>Tasarım & Renk</Text>
        <View style={styles.colorCard}>
          <Animated.View style={[styles.colorImageWrap, { opacity: imageOpacity }]}>
            <Image
              source={selectedColor.image}
              style={styles.colorImage}
              resizeMode="cover"
            />
          </Animated.View>

          <View style={styles.colorBottom}>
            <View style={styles.pillToggle}>
              {COLOR_OPTIONS.map((option) => {
                const isActive = selectedColor.id === option.id;
                return (
                  <Pressable
                    key={option.id}
                    style={[styles.pillOption, isActive && styles.pillOptionActive]}
                    onPress={() => handleColorSelect(option)}
                  >
                    <View
                      style={[
                        styles.pillDot,
                        { backgroundColor: option.dot },
                      ]}
                    />
                    <Text
                      style={[
                        styles.pillLabel,
                        isActive && styles.pillLabelActive,
                      ]}
                    >
                      {option.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.colorDesc}>
              Mat ve parlak yüzeylerin dengesiyle tasarlanan GM 26 5G, sade ve güçlü bir duruş sunar.
            </Text>
          </View>
        </View>

        {/* ── DİĞER KARTLAR ── */}
        {CARDS.map((card) => (
          <View key={card.id}>
            <Text style={[typography.h2, styles.sectionTitle]}>{card.sectionTitle}</Text>
            <View style={styles.card}>
              {/* imageBg varsa arka plan rengi, yoksa transparent - overflow:hidden karta zaten var */}
              <View
                style={{
                  backgroundColor: card.imageBg ?? 'transparent',
                  paddingBottom: card.imageBottomPadding ?? 0,
                }}
              >
                <Image
                  source={card.image}
                  style={[
                    styles.cardImage,
                    {
                      height: card.autoHeight
                        ? (imageHeights[card.id] ?? card.imageHeight ?? 300)
                        : (card.imageHeight ?? 300),
                    },
                  ]}
                  resizeMode={card.resizeMode ?? 'cover'}
                />
              </View>
              <View style={styles.cardBottom}>
                <View style={[styles.badge, { backgroundColor: card.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: card.badgeColor }]}>
                    {card.badge}
                  </Text>
                </View>
                <Text style={styles.cardDesc}>{card.desc}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* ── ÖZET ── */}
        <Text style={[typography.h2, styles.sectionTitle]}>Teknik Özet</Text>
        <View style={styles.summaryCard}>
          {[
            { key: 'Ekran boyutu', val: '6.75" HD+', dot: '#7F77DD' },
            { key: 'Yenileme hızı', val: '120 Hz', dot: '#378ADD' },
            { key: 'Ekran koruması', val: 'Iron Guard', dot: '#1D9E75' },
            { key: 'Su & Toz', val: 'IP64', dot: '#D4537E' },
            { key: 'Renk seçenekleri', val: 'Gümüş / Siyah', dot: '#97C459' },
          ].map((item, index, arr) => (
            <View
              key={item.key}
              style={[
                styles.summaryRow,
                index === arr.length - 1 && styles.summaryRowLast,
              ]}
            >
              <View style={styles.summaryLeft}>
                <View style={[styles.summaryDot, { backgroundColor: item.dot }]} />
                <Text style={styles.summaryKey}>{item.key}</Text>
              </View>
              <Text style={styles.summaryVal}>{item.val}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};