import {StyleSheet} from 'react-native';
import {colors} from './colors';

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 10,
  },
  headerText:{fontSize: 22, fontWeight: 'bold', marginLeft: 15}
});

export default globalStyle;
