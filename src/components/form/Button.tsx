import React, {FC, type PropsWithChildren} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';

const ButtonComponent: FC<
  PropsWithChildren<{
    label?: string;
    color?: string;
    style?: any;
    onPress?: (value: any) => void;
  }>
> = ({label, style, color = themeColor.primary.main, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      style={{
        padding: 15,
        borderRadius: 10,
        marginBottom: 6,
        marginTop: 6,
        backgroundColor: themeColor.primary.main,
        flexDirection: 'row',
        borderColor: color,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text
        style={{
          marginLeft: 5,
          color: 'white',
          fontFamily: themeFont.themeFontMedium,
          fontSize: 18,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
