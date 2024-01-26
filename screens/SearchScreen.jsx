import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb'
import { debounce } from 'lodash'
import Loading from '../components/Loading'


const { width, height } = Dimensions.get('window');


export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])

    const handleSearch = search => {
        if (search && search.length > 2) {
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data => {
                console.log('got search results');
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>

            {/* search input */}
            <View
                style={{
                    margin: 4,
                    marginBottom: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#6B7280',
                    borderRadius: 50,
                    paddingHorizontal: 5,
                    paddingVertical: 3
                }}
                // className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
            >
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Movie"
                    placeholderTextColor={'lightgray'}
                    style={{
                        flex: 1,
                        paddingLeft: 10,
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'white',
                        letterSpacing: 1,
                        width: '100%'
                    }}
                // className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    // className="rounded-full p-3 m-1 bg-neutral-500" 
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 50,
                        backgroundColor: '#6B7280',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 1,
                        marginLeft: 10
                    }}
                >
                    <XMarkIcon size="25" color="white" />

                </TouchableOpacity>
            </View>

            {/* search results */}
            {
                loading ? (
                    <Loading />
                ) :
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            // className="space-y-3"
                            style={{ flex: 1 }}
                        >
                            <Text 
                            // className="text-white font-semibold ml-1"
                            style={{ color: 'white', fontWeight: 'bold', marginLeft: 15 }}>Results ({results.length})</Text>
                            <View
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}
                            //  className="flex-row justify-between flex-wrap"
                             >
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Image
                                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                                        // source={require('../assets/images/moviePoster2.png')}
                                                        className="rounded-3xl"
                                                        style={{ width: width * 0.44, height: height * 0.3,borderRadius:15 }}
                                                    />
                                                    <Text 
                                                    // className="text-gray-300 ml-1" 
                                                    style={{ color: 'gray', marginLeft: 15, marginTop: 5 }}>
                                                        {
                                                            item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>

                        </ScrollView>
                    ) : (
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                            <Image
                                source={require('../assets/images/movieTime.png')}
                                // className="h-96 w-96"
                                style={{height:300,width:300}}
                            />
                        </View>
                    )
            }
        </SafeAreaView>
    )
}