import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: colors.success,
  },
});

export default styles;
