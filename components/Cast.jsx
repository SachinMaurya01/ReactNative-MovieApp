import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { fallbackPersonImage, image185, image342 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
    const personName = "keanu Reevs";
    const character = 'John Wick';
    return (
        <View style={{ marginVertical: 6 }}>
            <Text style={{ color: 'white', fontSize: 19, marginHorizontal: 4, marginBottom: 10, marginTop: 14,fontWeight:'700' }}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ marginRight: 4, alignItems: 'center' }}
                                onPress={() => { navigation.navigate('Person', person) }}
                            >
                                <View
                                    style={{ overflow: 'hidden', borderRadius: 100, height: 60, width: 60,justifyContent:'center', alignItems: 'center', border: '1px solid #6b7280', marginHorizontal: 15 }}>
                                    <Image
                                        style={{ borderRadius: 20, height: 60, width: 60 }}
                                        source={{uri: image185(person?.profile_path) || fallbackPersonImage}} 
                                        // source={require('../assets/images/castImage1.png')}
                                    />
                                </View>
                                <View style={{ marginTop: 6 }}>
                                    <Text style={{ color: 'white', fontSize: 14, marginTop: 1 }} >
                                        {/* oko */}
                                        {
                                        person?.character.length > 10 ? person.character.slice(0, 10) + '...' : person?.character
                                    }
                                    </Text>
                                    <Text style={{ color: '#6b7280', fontSize: 11 }} >
                                        {/* oko */}
                                        {
                                        person?.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name
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
