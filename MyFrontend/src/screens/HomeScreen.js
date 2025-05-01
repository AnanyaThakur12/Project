import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:4200/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data)
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Alert.alert('Session expired', 'Please log in again.');

        await AsyncStorage.removeItem('token');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  }

  return (
    <View style={styles.main}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})