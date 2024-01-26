import { View, Text, TouchableWithoutFeedback, Dimensions ,Image} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from "@react-navigation/native"
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var {width,height}=Dimensions.get('window')

export default function TrendingMovies({data}) {
    const navigation =useNavigation();
    const handleClick=(item)=>{
        navigation.navigate("Movie",item);
    }

  return (
    <View style={{marginBottom:8}}>
      <Text style={{color:'white', fontSize:20, marginBottom:20,paddingLeft:5, marginTop:15}}>Trending</Text>
    <Carousel
     data={data}
     renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}/>}
     firstItem={1}
     inactiveSlideOpacity={0.60}
     sliderWidth={width}
     itemWidth={width*0.62}
     slideStyle={{display:'flex',alignItems:'center'}}
    />
    </View>
  )
}

const MovieCard=({item,handleClick})=>{
    return (
        <TouchableWithoutFeedback onPress={()=>{handleClick(item)}}>
            <Image 
            // source={ require('../assets/images/moviePoster1.png')}
            source={{uri: image500(item.poster_path)}} 
            style={{
                width:width*0.6,
                height:height*0.4,
                borderRadius:30
            }}

            />
        </TouchableWithoutFeedback>
    )
}

// const styles=StyleSheet.create({

// })