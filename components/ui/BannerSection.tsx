import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BannerSection() {
  return (
    <View style={styles.banner}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Chào mừng đến với PhyGen</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tạo đề ngay</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri : 'https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg' }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FF6F61',
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
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    marginRight: 16,
  },
  buttonText: {
    color: '#FF6F61',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
