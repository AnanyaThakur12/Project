// import { View, Text, TextInput, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import Login from './src/screens/Login';

// const App = () => {
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');
//   const [work, setWork] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [name, setName] = useState('');

//   useEffect(()=>{
//     setEmail('')
//   },[])

//   const handleLogin = async () => {
//     if (!email || !name || !age || !work || !mobileNumber) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:4200/person', {
//         email, name, work, age, mobileNumber
//       })
//       console.log(response)
//     }
//     catch (err) {
//       console.log(err)
//     }

//   }
//   return (
//     <View style={{ 
//       justifyContent: 'center',
//        flex: 1,
//       //  marginVertical:20
//         }}>
//       {/* <TextInput
//         placeholder='Enter email'
//         placeholderTextColor="black"
//         style={{
//           borderWidth: 1,
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginVertical: 10
//         }}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         placeholder='Enter age'
//         placeholderTextColor="black"
//         style={{
//           borderWidth: 1,
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginVertical: 10
//         }}
//         value={age}
//         onChangeText={(text) => setAge(text)}
//       />
//       <TextInput
//         placeholder='Enter work'
//         placeholderTextColor="black"
//         style={{
//           borderWidth: 1,
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginVertical: 10
//         }}
//         value={work}
//         onChangeText={(text) => setWork(text)}
//       />
//       <TextInput
//         placeholder='Enter mobilenumber'
//         placeholderTextColor="black"
//         style={{
//           borderWidth: 1,
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginVertical: 10
//         }}
//         value={mobileNumber}
//         onChangeText={(text) => setMobileNumber(text)}
//       />
//       <TextInput
//         placeholder='Enter name'
//         placeholderTextColor="black"
//         style={{
//           borderWidth: 1,
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginVertical: 10
//         }}
//         value={name}
//         onChangeText={(text) => setName(text)}
//       /> */}

//       <Login/>
//       {/* <Button onPress={() => handleLogin()} title='click me' /> */}
//     </View>
//   )
// }

// export default App

import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default App