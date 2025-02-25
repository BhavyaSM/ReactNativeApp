import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: colors.gray100,
    borderRadius: 5,
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray200,
  },
  error: {
    color: colors.red,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  carousel: {
    marginTop: 100,
  },
  imageContainer: {
    width: width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 500,
    resizeMode: 'cover',
    marginTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.gray200,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: colors.gray300,
    marginTop: 10,
    lineHeight: 22,
  },
  category: {
    fontSize: 14,
    color: colors.gray400,
    marginTop: 10,
    fontWeight: '500',
  },
});

export default styles;
