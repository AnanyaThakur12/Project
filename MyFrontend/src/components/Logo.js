import { View, Text, Image } from 'react-native'
import React from 'react'

const Logo = () => {
    return (
        <View style={{position:'absolute', top:'11%', alignSelf:'center'}}> 
            <Image
                source={require('../public/POSTORA.gif')}
                style={{ width: 250, height: 200 }}
            />
        </View>
    )
}

export default Logo