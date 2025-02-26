import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {fetchProductDetails} from '../../redux/slices/productDetailSlice';
import {colors} from '../../utils/colors';
import globalStyle from '../../utils/globalStyle';
import styles from './styles';

const ProductDetailScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const {productId} = route.params; // Get productId from navigation
  const dispatch = useAppDispatch();
  const {product, loading, rejected} = useAppSelector(
    state => state.productDetails,
  );

  const {width} = Dimensions.get('window');

  useEffect(() => {
    dispatch(fetchProductDetails(productId)); // Fetch product details
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={globalStyle.loaderContainer}>
        <ActivityIndicator animating={true} color={colors.gray200} size={50} />
      </View>
    );
  }

  if (rejected) {
    return <Text style={styles.error}>Failed to load product details.</Text>;
  }

  if (!product) return null; // Return nothing if no product data

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width} // Ensure each image fully snaps
        snapToAlignment="start"
        decelerationRate="fast"
        style={styles.carousel}>
        {product.images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.category}>Category: {product.category.name}</Text>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
