import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../utils/globalStyle';

const Header: React.FC<{title: string}> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={globalStyle.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../assets/hamburger.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>
      <Text style={globalStyle.headerText}>{title}</Text>
    </View>
  );
};

export default Header;
