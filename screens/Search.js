import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, AsyncStorage} from 'react-native';
import { TextInput, Button, Card  } from 'react-native-paper';
import Home from './Home';

const Search = ({navigation}) => {

  var [city, setCity] = useState("");
  var [cities, setSeties] = useState([]);

  fetchCities = (text) => {
      setCity(text)
      fetch("https://autocomplete.wunderground.com/aq?query=" + text)            // ქალაქების და ქვეყების autocomplete
      .then(ithem => ithem.json())
      .then(cityData =>{

        setSeties(cityData.RESULTS.slice(0,9));
      })
  }

  var saveBtnClick = async() =>{

    await AsyncStorage.setItem('selectedCity', city);
    navigation.navigate("Home",{city:city});
  }

  var listItemClick = async(cityName) =>{
    setCity(cityName);
    await AsyncStorage.setItem('selectedCity', cityName);
    navigation.navigate("Home",{city:cityName});
  }
  return (
    <View style={styles.container}>
        <TextInput
          label='City name'
          theme={{
            colors: {
                       placeholder: '#3e2465', text: '#3e2465', primary: '#3e2465',
                       underlineColor: '#3e2465', background: '#ffffff'
               }
         }}
          value={city}
          onChangeText={text => this.fetchCities(text)}
        /> 
        <Button icon="city" 
                style={{margin:10}} 
                mode="contained" 
                onPress={() => saveBtnClick()}
                theme ={{colors:{primary:'gold', text: '#3e2465'}}}
                >
          Choose
        </Button>
        <FlatList
          data={cities}
          renderItem = {({item})=>{
            return(
                <Card style={{padding:12, margin:3 }} onPress={() => listItemClick(item.name)}>
                  <View style={{flex: 1, flexDirection:"row"}}>
                    <Text style={{marginTop:5}}>{item.name}</Text>
                    <Image  source={{uri:`https://www.countryflags.io/${item.c}/flat/64.png`}} style={{marginLeft:10, width:32,height:32}}/>
                  </View>
                </Card>
            )
          }}
          keyExtractor={item=>item.name}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    zIndex: 1, top: 20 , right: 0,
  },
});

export default Search;