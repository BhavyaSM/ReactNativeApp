import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {fetchProducts} from '../../redux/slices/productSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import styles from './styles';
import {colors} from '../../utils/colors';
import globalStyle from '../../utils/globalStyle';
import Header from '../../components/Header';

const ProductListScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();

  // 🔹 Fetch products from Redux state
  const {
    success: products,
    loading,
    rejected,
  } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProductPress = (productId: any) => {
    navigation.navigate('ProductDetail', {productId});
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
      <Card style={styles.card}>
        <Image source={{uri: item.images[0]}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.price}>${item?.price}</Text>
          <Text style={styles.category}>{item?.category?.name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyle.container}>
      <Header title="Products" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {rejected ? <Text>Error: {rejected}</Text> : null}

      {loading ? (
        <View style={globalStyle.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={colors.gray200}
            size={50}
          />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;
