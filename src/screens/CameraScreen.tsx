import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';

const photoModes = [
  {
    id: 'night',
    title: 'Gece Modu',
    desc: 'Karanlık şehir sokaklarını canlı ve net fotoğraflara dönüştürerek canlı ve dengeli çekimler yapmanızı sağlar.',
    image: require('../../GM 26 Pro/26gecemodu.png'),
    tag: null,
  },
  {
    id: 'portrait',
    title: 'Portre Modu',
    desc: '7 farklı diyafram seviyesi ile arka plan etkisini dilediğiniz gibi ayarlayın, ister doğal ister dramatik portreler elde edin.',
    image: require('../../GM 26 Pro/26portremodu.png'),
    tag: null,
  },
  {
    id: 'ai',
    title: 'AI Fotoğraf Modu',
    desc: 'AI modu sahneyi algılar, ayarları otomatik optimize eder. Size sadece anı yakalamak kalır.',
    image: require('../../GM 26 Pro/26aifoto.png'),
    tag: 'Yapay Zeka',
  },
];

export const CameraScreen = () => {
  const navigation = useNavigation();
  const { colors, mode } = useTheme();

  const isDark = mode === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },

    // Glow efektleri
    glowBg: { position: 'absolute', borderRadius: 1000, zIndex: -1 },
    glowTopRight: {
      width: 500, height: 500,
      top: '-10%', right: '-30%',
      backgroundColor: colors.purple,
      opacity: isDark ? 0.12 : 0.04,
    },
    glowBottomLeft: {
      width: 400, height: 400,
      bottom: '10%', left: '-25%',
      backgroundColor: colors.accent,
      opacity: isDark ? 0.07 : 0.03,
    },

    // Header
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 0,
    },
    backButton: {
      width: 40, height: 40, borderRadius: 20,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: colors.border,
    },
    headerTitleWrap: { flex: 1 },
    headerTitle: {
      letterSpacing: 3,
      color: colors.text,
      textTransform: 'uppercase',
    },
    headerSub: {
      fontSize: 10,
      color: colors.textSecondary,
      letterSpacing: 1.5,
      marginTop: 2,
    },

    scrollContent: { padding: 18, paddingBottom: 60 },

    // Hero kart
    heroCard: {
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.purple + '44',
    },
    heroImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    heroOverlay: {
      padding: 16,
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    },
    heroName: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.textSecondary,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 18,
    },

    // Bölüm başlığı
    sectionLabel: {
      fontSize: 10,
      fontWeight: '500',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: colors.textSecondary,
      marginBottom: 14,
    },
    sectionLabelLarge: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      letterSpacing: 0.3,
    },

    // Timeline
    timeline: {
      paddingLeft: 22,
      position: 'relative',
    },
    timelineLine: {
      position: 'absolute',
      left: 4,
      top: 8,
      bottom: 8,
      width: 1,
      backgroundColor: colors.border,
    },
    tlItem: {
      position: 'relative',
      marginBottom: 14,
    },
    tlDot: {
      position: 'absolute',
      left: -22,
      top: 6,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.purple,
      borderWidth: 2,
      borderColor: colors.background,
    },
    tlCard: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderRadius: 14,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tlImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 8,
      marginBottom: 10,
      opacity: isDark ? 0.85 : 1,
    },
    tlTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    tlDesc: {
      fontSize: 12,
      lineHeight: 18,
      color: colors.textSecondary,
    },
    tlTag: {
      alignSelf: 'flex-start',
      marginTop: 8,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 20,
      backgroundColor: colors.purple + '18',
      borderWidth: 1,
      borderColor: colors.purple + '44',
    },
    tlTagText: {
      fontSize: 10,
      fontWeight: '500',
      color: colors.purple,
      letterSpacing: 0.5,
    },

    // Video kart
    videoCard: {
      borderRadius: 18,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    videoImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      opacity: isDark ? 0.85 : 1,
    },
    videoBody: {
      padding: 14,
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    },
    videoTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    videoTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    newPill: {
      paddingHorizontal: 9,
      paddingVertical: 2,
      borderRadius: 20,
      backgroundColor: colors.purple + '18',
      borderWidth: 1,
      borderColor: colors.purple + '44',
    },
    newPillText: {
      fontSize: 9,
      fontWeight: '500',
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.purple,
    },
    videoDesc: {
      fontSize: 12,
      lineHeight: 18,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.glowBg, styles.glowTopRight]} />
      <View style={[styles.glowBg, styles.glowBottomLeft]} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color={colors.text} size={20} />
          </Pressable>
          <View style={styles.headerTitleWrap}>
            <Text style={[typography.h3, styles.headerTitle]}>Kamera</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* HERO — ANA KAMERA */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../GM 26 Pro/26anacamera.png')}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroName}>Arka Kamera</Text>
            <Text style={styles.heroDesc}>
              Gücünü Sony sensörden alan 64MP kamera ile net ve detaylı kareler yakalayın, EIS desteği ile hareket halindeyken bile stabil çekimlerin keyfini çıkarın.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* FOTOĞRAF MODLARI — TİMELINE */}
        <Text style={styles.sectionLabelLarge}>Fotoğraf Modları</Text>

        <View style={styles.timeline}>
          <View style={styles.timelineLine} />
          {photoModes.map((item) => (
            <View key={item.id} style={styles.tlItem}>
              <View style={styles.tlDot} />
              <View style={styles.tlCard}>
                <Image
                  source={item.image}
                  style={styles.tlImage}
                />
                <Text style={styles.tlDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.divider, { marginTop: 6 }]} />

        {/* VİDEO */}
        <View style={styles.videoCard}>
          <Image
            source={require('../../GM 26 Pro/26ikiacilivideo.png')}
            style={styles.videoImage}
          />
          <View style={styles.videoBody}>
            <Text style={styles.videoDesc}>
              Ön ve arka kamerayı aynı anda kullanarak iki yönü de tek bir videoda birleştirin. Anın büyüsünü ve atmosferini aynı videoda saklayın.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};