import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export type BannerSectionProps = {
  title: string;
  buttonText: string;
  imageUrl?: string | any;
};

export default function BannerSection({ title, buttonText, imageUrl }: BannerSectionProps) {
  return (
    <LinearGradient
      colors={['#2E3192', '#1BFFFF']}
      style={styles.banner}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    height: 140,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 8,
    marginRight: 16,
    maxWidth: 100,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
