import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { moviesData } from '../constants'
import { fallbackMoviePoster, image185, image342, poster342 } from '../api/moviedb';

var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, hideSeeAll }) {
    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 8, }}>
            <View style={{ margin: '4 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, paddingLeft: 5, marginTop: 15 }}>
                    {title}
                </Text>
                {!hideSeeAll && (<TouchableOpacity>
                    <Text style={{ fontSize: 13, color: 'yellow', marginRight: 10 }}>See All</Text>
                </TouchableOpacity>)
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('Movie', item)}
                            >
                                <View style={{ marginRight: 4 }}>
                                    <Image
                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                        // source={require('../assets/images/moviePoster2.png')}
                                        style={{ borderRadius: 15, width: width * 0.33, height: height * 0.22, marginRight: 15 }}
                                    />
                                    <Text style={{ marginLeft: 5 }}>
                                        {
                                            item.title.length>14? item.title.slice(0,14)+'...': item.title
                                            // movieName.length > 14 ? movieName.slice(0,14)+'...':movieName
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}