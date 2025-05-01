import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter all the fields!!")
            return;
        }
        try {
            const response = await axios.post("http://localhost:4200/login", {
                email, password
            },
            )
            const token = response.data.accessToken;
            await AsyncStorage.setItem('token', token)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });

            setEmail('');
            setPassword('');

        }
        catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    alert("Invalid email or password.");
                } else {
                    alert(`Error: ${err.response.data.error || "Something went wrong"}`);
                }
            } else {
                alert("Network error. Please try again.");
            }

            console.log(err)

        }
    }

    return (
        <View style={styles.main}>
            <Logo />
            <View style={styles.content}>
                <Text style={styles.heading}>Login to your Account</Text>
                <TextInput style={styles.inputField} placeholder='Email' value={email} onChangeText={setEmail} placeholderTextColor="black" />
                <TextInput autoCapitalize="none" secureTextEntry={true} style={styles.inputField} placeholder='Password' value={password} onChangeText={setPassword} placeholderTextColor="black" />

                <TouchableOpacity activeOpacity={0.7} style={styles.button}
                    onPress={() =>
                        handleLogin()
                    }
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text style={styles.signUp}>Don't have an account?</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Signup")}>
                        <Text style={[styles.signUp, { marginLeft: 5, color: 'darkblue' }]}>Sign up</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
    loginText: {
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
    signUp: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
})