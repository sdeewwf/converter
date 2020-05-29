import React, {useState} from 'react';
import axios from 'axios'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-community/picker';

export default function App() {

  const [value, setValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [select, setSelect] = useState('USD')
  
  handleChange = () => {
    if (value !== '') {
      if(select==="USD")
      {
        axios({
          "method":"GET",
          "url":"https://currency13.p.rapidapi.com/convert/1/RUB/USD",
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"currency13.p.rapidapi.com",
          "x-rapidapi-key":"b9772206f0msh045915d883528aap12b313jsn00c968ddff40",
          "useQueryString":true
          }
          })
          .then(({data})=>{
            setSecondValue(data.amount*value);
          })
      }
      else if (select==="RUB")
      {
        axios({
          "method":"GET",
          "url":"https://currency13.p.rapidapi.com/convert/1/USD/RUB",
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"currency13.p.rapidapi.com",
          "x-rapidapi-key":"b9772206f0msh045915d883528aap12b313jsn00c968ddff40",
          "useQueryString":true
          }
          })
      
          .then(({data})=>{
            setSecondValue(data.amount*value);
          });
      }

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          multiline
          style={styles.input}
          placeholder='Type value to convert'
          onChangeText={(val) => setValue(val)}
          onChange={handleChange()}
        />
      </View>
      <View style={styles.selectContainer}>
          <Text style={styles.text}>Convert to: </Text>
          <Picker
            style={styles.selectItem}
            selectedValue={select}
            onValueChange={(value) => {
              setSelect(value)
            }}
          >
              <Picker.Item label="USD" value="USD"/>
              <Picker.Item label="RUB" value="RUB"/>
          </Picker>
      </View>
      <View style={styles.TextContainer}>
              <Text style={styles.text}>
              {secondValue}
              </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20 
  },
  InputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  TextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectItem: {
    flex: 2/1.3,
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    marginLeft: 15
  },  
  input: {
    margin: 10,
    color: 'red',
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  },
  button: {
    borderRadius: 10
  },
  convertedText: {
    color: 'red'
  }
});
