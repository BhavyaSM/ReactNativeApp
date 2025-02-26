import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

const styles = StyleSheet.create({
  header: {fontSize: 28, fontWeight: 'bold', color: colors.black},
  searchBar: {
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 10,
    borderRadius: 15, 
    backgroundColor: 'white',
    elevation: 5, // Increased shadow for better depth (Android)
    shadowColor: colors.black, // Shadow effect for iOS
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 10, 
    alignItems: 'center', 
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.purple,
    marginTop: 4,
  },
});

export default styles;
