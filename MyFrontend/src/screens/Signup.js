import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../components/Header';
import Logo from '../components/Logo';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please enter all the fields!!")
        }
        try {
            const response = await axios.post("http://localhost:4200/signUp", {
                email, password, confirmPassword
            })
            console.log(response.data, "response");
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.main}>
            <Header />
            <Logo />
            <View style={styles.content}>

                <Text style={styles.heading}>Create your Account</Text>
                <TextInput style={styles.inputField} placeholder='Email' value={email} onChangeText={setEmail} placeholderTextColor="black" />
                <TextInput autoCapitalize="none" secureTextEntry={true} style={styles.inputField} placeholder='Password' value={password} onChangeText={setPassword} placeholderTextColor="black" />
                <TextInput autoCapitalize="none" secureTextEntry={true} style={styles.inputField} placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor="black" />

                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => handleSignup()}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp


const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    inputField: {
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 12,
        borderColor: '#dadada',
        marginVertical: 10,
        fontSize: 13,
        textTransform: 'lowercase',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'grey',
    },
    signupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 12,
        paddingVertical: 20,
        backgroundColor: 'darkblue'
    },
    content: {
    }
})