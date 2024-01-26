import { View, Text, ScrollView, Touchable, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';


var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';

export default function MovieScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const movieName = "Ant-Man and the Wasp Qunatumania";


    useEffect(() => {
        setLoading(true);
        getMovieDetials(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetials = async id => {
        const data = await fetchMovieDetails(id);
        console.log('got movie details');
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}
            style={{ display: 'flex', flex: 1, backgroundColor: 'black' }}>
            <View style={{ width: '100%' }}>
                <SafeAreaView style={{ marginTop: ios ? 0 : 20, position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ borderRadius: 13, padding: 1, backgroundColor: '#ecb403' }}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/images/moviePoster2.png')}
                                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40, position: 'absolute', bottom: 0 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            // className="absolute bottom-0"
                            />
                        </View>

                    )}
            </View>

            {/* movie details */}
            <View style={{
                marginTop: -(height * 0.09), marginTop: 0.75,
                marginBottom: 0.75
            }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: '600', letterSpacing: 3 }}>
                    {
                        // movieName
                        movie?.title
                    }
                </Text>

                {/* status,release,runtime */}
                {
                    movie?.id ? (
                        <Text style={{ letterSpacing: 2, color: '#6b7280', fontWeight: '600', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

                {/* genres */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4, gap: 10, marginTop: 10 }}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} style={{ color: '#6b7280', fontWeight: '700', fontSize: 12, lineHeight: 15, textAlign: 'center' }}>
                                    {genre?.name} {showDot ? "•" : null}
                                    {/* Action • */}
                                </Text>
                            )
                        })
                    }
                    {/* <Text style={{ color: '#6b7280', fontWeight: '700', fontSize: 12, lineHeight: 15, textAlign: 'center' }}>
                        Thrill •
                    </Text>
                    <Text style={{ color: '#6b7280', fontWeight: '700', fontSize: 12, lineHeight: 15, textAlign: 'center' }}>
                        Comedy
                    </Text> */}
                </View>

                {/* Description */}
                <Text style={{ color: '#6b7280', marginHorizontal: 4, letterSpacing: 2, marginTop: 15 }}>
                    {
                        movie?.overview
                    }
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt animi quasi ipsum neque commodi ipsa, dolor adipisci aspernatur culpa facilis atque, numquam velit magnam deserunt ea aliquid rerum omnis sint. */}
                </Text>
            </View>

            {/* Cast */}
            {
                movie?.id && cast.length > 0 &&
                <Cast navigation={navigation} cast={cast} />
            }

            {/* similar movies */}
            {
                movie?.id && similarMovies.length > 0 &&
                <MovieList
                    title="Similar movies" hideSeeAll={true} data={similarMovies}/>
            }

        </ScrollView>
    )
}