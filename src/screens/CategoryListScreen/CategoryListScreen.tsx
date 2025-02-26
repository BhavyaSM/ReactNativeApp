import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {fetchCategories} from '../../redux/slices/categorieSlice';
import {colors} from '../../utils/colors';
import globalStyle from '../../utils/globalStyle';
import Header from '../../components/Header';
import styles from './styles';

const CategoryListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {categories, loading} = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <SafeAreaView style={globalStyle.container}>
      <Header title="Categories" />

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
          data={categories}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryListScreen;
