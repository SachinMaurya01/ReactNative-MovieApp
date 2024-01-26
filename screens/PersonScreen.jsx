import { View, Text, ScrollView, Touchable, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList'
import Loading from '../components/Loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';

export default function PersonScreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if (data) {
            setPerson(data);
        }
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }

    }


    return (
        <ScrollView style={{ display: 'flex', flex: 1, backgroundColor: 'black' }} contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginTop: ios ? 0 : 20, }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ borderRadius: 13, padding: 1, backgroundColor: '#ecb403' }}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading />
                ) : (

                    <SafeAreaView>

                        <View>
                            <View style={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'center', shadowColor: 'gray',
                                shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1, marginTop: 80
                            }}>
                                <View style={{ alignItems: 'center', borderRadius: 100, overflow: 'hidden', height: 200, width: 200, border: '2px solid rgb(115 115 115)' }}>
                                    <Image
                                        // source={require('../assets/images/castImage2.png')}
                                        source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                        style={{ height: height * 0.30, width: width * 0.52 }}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 33, color: 'white', fontWeight: 'bold', textAlign: 'center' }} >
                                    {/* Keanu Reeves */}
                                    {person?.name}
                                </Text>
                                <Text style={{ color: '#64748b', fontSize: 14, textAlign: 'center' }}>
                                    {person?.place_of_birth}
                                    {/* Beirut, Lebanon */}
                                </Text>
                            </View>

                            <View
                                style={{ marginHorizontal: 5, padding: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                 borderRadius: 100, backgroundColor: '#343734' }}>
                                <View style={{ borderRightWidth: 2, borderColor: '#6b7280', paddingHorizontal: 7, alignItems: 'center',justifyContent:'center' }} >
                                    <Text style={{ color: 'white', fontWeight: '500' }} >Gender</Text>
                                    <Text style={{ color: '#8b8d8a', fontSize: 12 }} >
                                        {/* Male */}
                                        {
                                            person?.gender == 1 ? 'Female' : 'Male'
                                        }
                                    </Text>
                                </View>
                                <View style={{ borderRightWidth: 2, borderColor: '#6b7280', paddingHorizontal: 7, alignItems: 'center',justifyContent:'center' }} >
                                    <Text style={{ color: 'white', fontWeight: '500' }}>Birthday</Text>
                                    <Text style={{ color: '#8b8d8a', fontSize: 12 }} >
                                        {/* 1964-09-02 */}
                                        {person?.birthday}
                                    </Text>
                                </View>
                                <View style={{ borderRightWidth: 2, borderColor: '#6b7280', paddingHorizontal: 7, alignItems: 'center',justifyContent:'center' }} >
                                    <Text style={{ color: 'white', fontWeight: '500' }}>known for</Text>
                                    <Text style={{ color: '#8b8d8a', fontSize: 12 }} >
                                        {/* Acting */}
                                        {person?.known_for_department}
                                    </Text>
                                </View>
                                <View style={{ paddingHorizontal: 2, alignItems: 'center',justifyContent:'center' }}>
                                    <Text style={{ color: 'white', fontWeight: '500' }}>Popularity</Text>
                                    <Text style={{ color: '#8b8d8a', fontSize: 12 }} >
                                        {/* 84.23 % */}
                                        {person?.popularity?.toFixed(2)} %
                                    </Text>
                                </View>

                            </View>
                            <View style={{ marginVertical: 15, marginHorizontal: 4, paddingHorizontal: 2}} >
                                <Text style={{ color: 'white', fontSize: 20 }}>Biography</Text>
                                <Text style={{ color: '#6b7280',marginTop:6  }}>
                                    {
                                        person?.biography ? person.biography : 'N/A'
                                    }
                                </Text>
                            </View>

                            
                            {/* person movies */}
                            {person?.id && personMovies.length > 0 &&
                                <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                            }
                        </View>
                    </SafeAreaView>
                )}


        </ScrollView>
    )
}