import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
// import { styles, theme } from '../theme';
const {width, height} =  Dimensions.get('window');

export default function Loading() {
  return (
    <View style={{height, width, position:'absolute',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <Progress.CircleSnail thickness={12} size={160} color={'black'} />
    </View>
  )
}