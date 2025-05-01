import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{ position: 'absolute', top: '8%', left:'5%' }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={30} color="black" />
            </TouchableOpacity>

        </View>
    )
}

export default Header