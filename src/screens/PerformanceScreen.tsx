import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Cpu, Signal, Database, BatteryFull } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';

export const PerformanceScreen = () => {
  const navigation = useNavigation();
  const { colors, mode } = useTheme();

  const fadeAnims = Array.from({ length: 6 }, () => useRef(new Animated.Value(0)).current);
  const slideAnims = Array.from({ length: 6 }, () => useRef(new Animated.Value(30)).current);

  useEffect(() => {
    fadeAnims.forEach((anim, i) => {
      Animated.parallel([
        Animated.timing(anim, { toValue: 1, duration: 400, delay: i * 80, useNativeDriver: true }),
        Animated.timing(slideAnims[i], { toValue: 0, duration: 400, delay: i * 80, useNativeDriver: true }),
      ]).start();
    });
  }, []);

  const AnimatedCard = ({ index, children, style }: any) => (
    <Animated.View style={[{ opacity: fadeAnims[index], transform: [{ translateY: slideAnims[index] }] }, style]}>
      {children}
    </Animated.View>
  );

  const Tag = ({ label }: { label: string }) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );

  const StatPill = ({ value, label, last = false }: { value: string; label: string; last?: boolean }) => (
    <View style={[styles.statPill, last && { borderRightWidth: 0 }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },

    glowBg: { position: 'absolute', borderRadius: 1000, zIndex: -1 },
    glowRight: {
      width: 500, height: 500, top: '5%', right: '-35%',
      backgroundColor: '#7C3AED',
      opacity: mode === 'dark' ? 0.12 : 0.07,
    },
    glowLeft: {
      width: 350, height: 350, bottom: '15%', left: '-25%',
      backgroundColor: '#9333EA',
      opacity: mode === 'dark' ? 0.07 : 0.04,
    },

    header: {
      flexDirection: 'row', alignItems: 'center',
      paddingTop: 60, paddingHorizontal: 24, marginBottom: 20,
    },
    backButton: {
      width: 44, height: 44, borderRadius: 22,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center', alignItems: 'center', marginRight: 16,
      borderWidth: 1, borderColor: colors.border,
      flexShrink: 0,
    },
    title: { letterSpacing: 2, flex: 1, color: colors.text, textTransform: 'uppercase', flexShrink: 1 },
    scrollContent: { padding: 20, paddingBottom: 60 },

    card: {
      borderRadius: 24, borderWidth: 1, borderColor: colors.border,
      overflow: 'hidden', marginBottom: 12,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    },
    cardTop: { padding: 16, paddingBottom: 12 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    cardTitle: { color: colors.text, fontSize: 22, fontWeight: '500', letterSpacing: -0.5 },
    cardBadge: {
      backgroundColor: colors.accent + '18',
      borderWidth: 0.5, borderColor: colors.accent + '40',
      borderRadius: 7, paddingHorizontal: 10, paddingVertical: 4,
    },
    cardBadgeText: { color: colors.accent, fontSize: 11, fontWeight: '500' },
    cardDesc: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, marginBottom: 12 },
    tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    tag: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      borderWidth: 0.5, borderColor: colors.border,
      borderRadius: 6, paddingHorizontal: 9, paddingVertical: 3,
    },
    tagText: { color: colors.textSecondary, fontSize: 11 },

    cardImage: { width: '100%', height: 350, backgroundColor: colors.background },

    statStrip: {
      flexDirection: 'row',
      borderTopWidth: 1, borderTopColor: colors.border,
    },
    statPill: {
      flex: 1, paddingVertical: 12, alignItems: 'center',
      borderRightWidth: 1, borderRightColor: colors.border,
    },
    statValue: { color: colors.accent, fontSize: 15, fontWeight: '500', marginBottom: 2 },
    statLabel: { color: colors.textSecondary, fontSize: 10 },

    specsCard: {
      borderRadius: 24, borderWidth: 1, borderColor: colors.border,
      overflow: 'hidden', marginBottom: 12,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    },
    specsHeader: {
      paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
      borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    specsHeaderTitle: {
      color: colors.textSecondary, fontSize: 11,
      fontWeight: '500', letterSpacing: 2, textTransform: 'uppercase',
    },
    specRow: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 20, paddingVertical: 14,
      borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    specRowLast: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 20, paddingVertical: 14,
    },
    specIconBox: {
      width: 34, height: 34, borderRadius: 10,
      backgroundColor: colors.accent + '15',
      justifyContent: 'center', alignItems: 'center', marginRight: 14,
    },
    specTextGroup: { flex: 1 },
    specRowLabel: {
      color: colors.textSecondary, fontSize: 10,
      letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3,
    },
    specRowValue: { color: colors.text, fontSize: 15, fontWeight: '500' },
    specBadge: {
      backgroundColor: colors.accent + '15',
      borderWidth: 0.5, borderColor: colors.accent + '35',
      borderRadius: 7, paddingHorizontal: 9, paddingVertical: 4,
    },
    specBadgeText: { color: colors.accent, fontSize: 11, fontWeight: '500' },
    specSubRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
    specSubBadge: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2,
    },
    specSubBadgeText: { color: colors.textSecondary, fontSize: 10 },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.glowBg, styles.glowRight]} />
      <View style={[styles.glowBg, styles.glowLeft]} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        {/* numberOfLines={1} + adjustsFontSizeToFit ile tek satırda */}
        <Text style={[typography.h3, styles.title]} numberOfLines={1} adjustsFontSizeToFit>
          PERFORMANS VE GÜÇ
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* İŞLEMCİ */}
        <AnimatedCard index={0}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.titleRow}>
                <Text style={[typography.h3, styles.cardTitle]}>İşlemci</Text>
              </View>
              <Text style={[typography.body1, styles.cardDesc]}>
                MediaTek Dimensity 7100 işlemcisi sayesinde uygulamalar arasında hızlı geçiş yapabilir, kesintisiz ve stabil bir performans deneyimi yaşayabilirsiniz.
              </Text>
            </View>
            <Image
              source={require('../../GM 26 Pro/26islemci.png')}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.statStrip}>
              <StatPill value="5G" label="Bağlantı" />
              <StatPill value="Antutu 11" label="~768,176" />
              <StatPill value="Mali-G610" label="Grafik İşlemcisi" last />
            </View>
          </View>
        </AnimatedCard>

        {/* 5G BAĞLANTI */}
        <AnimatedCard index={1}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.titleRow}>
                <Text style={[typography.h3, styles.cardTitle]}>5G Bağlantı</Text>
              </View>
              <Text style={[typography.body1, styles.cardDesc]}>
                5G teknolojisi ile daha hızlı indirme, daha akıcı izleme ve kesintisiz bağlantı deneyimini yaşayın. Beklemeden, anında.
              </Text>
            </View>
            <Image
              source={require('../../GM 26 Pro/265g.png')}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
        </AnimatedCard>

        {/* RAM & HAFIZA */}
        <AnimatedCard index={2}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.titleRow}>
                <Text style={[typography.h3, styles.cardTitle]}>RAM & Hafıza</Text>
              </View>
              <Text style={[typography.body1, styles.cardDesc]}>
                20GB'a kadar RAM desteği ile yüksek performans ve akıcı kullanım sunarken, 256GB geniş depolama alanı ile tüm içeriklerin her an seninle olur.
              </Text>
            </View>
            <Image
              source={require('../../GM 26 Pro/26ramhafiza.png')}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
        </AnimatedCard>

        {/* BATARYA */}
        <AnimatedCard index={3}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.titleRow}>
                <Text style={[typography.h3, styles.cardTitle]}>Batarya</Text>
              </View>
              <Text style={[typography.body1, styles.cardDesc]}>
                6000mAh yüksek kapasiteli batarya ile gün boyu kesintisiz kullanımın keyfini çıkarın.
              </Text>
            </View>
            <Image
              source={require('../../GM 26 Pro/26batarya.png')}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
        </AnimatedCard>

        {/* TEKNİK ÖZELLİKLER */}
        <AnimatedCard index={4}>
          <View style={styles.specsCard}>
            <View style={styles.specsHeader}>
              <Text style={styles.specsHeaderTitle}>Teknik Özellikler</Text>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specIconBox}>
                <Cpu size={16} color={colors.accent} strokeWidth={1.5} />
              </View>
              <View style={styles.specTextGroup}>
                <Text style={styles.specRowLabel}>İşlemci</Text>
                <Text style={styles.specRowValue}>MediaTek Dimensity 7100</Text>
              </View>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specIconBox}>
                <Signal size={16} color={colors.accent} strokeWidth={1.5} />
              </View>
              <View style={styles.specTextGroup}>
                <Text style={styles.specRowLabel}>Bağlantı</Text>
                <Text style={styles.specRowValue}>5G Destekli</Text>
                <View style={styles.specSubRow}>
                  <View style={styles.specSubBadge}>
                    <Text style={styles.specSubBadgeText}>Hızlı İndirme</Text>
                  </View>
                  <View style={styles.specSubBadge}>
                    <Text style={styles.specSubBadgeText}>Kesintisiz</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specIconBox}>
                <Database size={16} color={colors.accent} strokeWidth={1.5} />
              </View>
              <View style={styles.specTextGroup}>
                <Text style={styles.specRowLabel}>RAM Kapasitesi</Text>
                <Text style={styles.specRowValue}>20GB'a kadar</Text>
                <View style={styles.specSubRow}>
                  <View style={styles.specSubBadge}>
                    <Text style={styles.specSubBadgeText}>8GB + 12GB</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specIconBox}>
                <Database size={16} color={colors.accent} strokeWidth={1.5} />
              </View>
              <View style={styles.specTextGroup}>
                <Text style={styles.specRowLabel}>Depolama</Text>
                <Text style={styles.specRowValue}>256GB ve 128GB Hafıza Seçenekleri</Text>
                <View style={styles.specSubRow}>
                  <View style={styles.specSubBadge}>
                    <Text style={styles.specSubBadgeText}>Geniş Alan</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.specRowLast}>
              <View style={styles.specIconBox}>
                <BatteryFull size={16} color={colors.accent} strokeWidth={1.5} />
              </View>
              <View style={styles.specTextGroup}>
                <Text style={styles.specRowLabel}>Batarya</Text>
                <Text style={styles.specRowValue}>6000 mAh</Text>
                <View style={styles.specSubRow}>
                  <View style={styles.specSubBadge}>
                    <Text style={styles.specSubBadgeText}>Gün Boyu</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </AnimatedCard>

      </ScrollView>
    </View>
  );
};