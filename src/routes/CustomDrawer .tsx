import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {colors} from '../utils/colors';
import {fetchProfile} from '../redux/slices/profileSlice';

const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();

  const {profile, loading, error} = useAppSelector(state => state.userProfile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.purple} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : profile ? (
          <>
            <Image source={{uri: profile.avatar}} style={styles.profileImage} />
            <Text style={styles.username}>{profile.name}</Text>
          </>
        ) : (
          <Text style={styles.username}>Guest</Text>
        )}
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Products')}>
          <Text style={styles.menuItem}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Category')}>
          <Text style={styles.menuItem}>Category</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.purple,
    marginTop: 20,
  },
});

export default CustomDrawerContent;
