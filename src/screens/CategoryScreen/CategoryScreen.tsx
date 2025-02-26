import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {colors} from '../../utils/colors';
import globalStyle from '../../utils/globalStyle';
import {fetchProductsByCategory} from '../../redux/slices/categoryListSlice';
import styles from './styles';

const CategoryScreen: React.FC = ({navigation}: any) => {
  const route = useRoute();
  const {categoryId, categoryName} = route.params as {
    categoryId: number;
    categoryName: string;
  };

  const dispatch = useAppDispatch();
  const {products, loading} = useAppSelector(state => state.categoryList);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  return (
    <SafeAreaView style={globalStyle.container}>
      <TouchableOpacity
        style={globalStyle.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={globalStyle.backText}>← Back</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={globalStyle.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={colors.gray200}
            size={50}
          />
        </View>
      ) : (
        <View style={{marginTop: '26%'}}>
          <Text style={globalStyle.headerText}>{categoryName}</Text>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.imageContainer}>
                <Image source={{uri: item.images[0]}} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoryScreen;
