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
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
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
});

export default globalStyle;
