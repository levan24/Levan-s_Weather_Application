import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,AsyncStorage, ImageBackground} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import { OPEN_KEY } from '../KEY/OpenWeatherApiKey';
import { GEO_KEY } from '../KEY/GeoApiKey';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = (props) => {
    const [info,setInfo] = useState({
        name : "Something Wrong :( Waiting ...",
        temp : "Waiting ...",
        desc : "Waiting ...",
        icon : "Waiting ...",
        Sunset : ":("

    });

    let CityName;
 
    useEffect(()=>{
        checkProps()
     },[props])
    
     const checkProps = async () =>{

        if(!props.route.params){

            const value = await AsyncStorage.getItem('selectedCity');
            
            if(value){
              CityName = value;
                getWeather();
            }else{
                fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_KEY}`, {       // dokumentacia tu rogor mivigot sakutari API https://developers.google.com/maps/documentation/geocoding/get-api-key
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${responseJson.location.lat},${responseJson.location.lng}&key=${GEO_KEY}`)                       // https://developers.google.com/maps/documentation/geocoding/start#GeocodingResponses   dokumentacia
                    .then((responsegeocode) => responsegeocode.json())
                    .then((results) => {
                    
                      CityName = results.results[4].address_components[1].long_name;
                        getWeather();
                    })
                })
            }
        }else{
          CityName = props.route.params.city;
            getWeather();
        }
    }

    const getWeather = () =>{

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&APPID=${OPEN_KEY}&units=metric`)   // 500 cda dgeshi
        .then(data=> data.json())
        .then(results =>{

            setInfo({
                name : results.name,
                temp : results.main.temp,
                desc : results.weather[0].description,
                main : results.weather[0].main,
                icon : results.weather[0].icon,
                countryCode : results.sys.country,
                Sunset: results.sys.sunset,
                Sunrise: results.sys.sunrise,
                FeelsLike: results.main.feels_like,
                Time: results.dt
            });
        })
         setTimeout(getWeather, 400000)   // informaciis updates aketebs yovel 6.40 wutshi anu 400 wamshi 1 xel. anu 216 shemowmeba 24 saatshi 500 shemowmbidan
    }

    var SetDate = new Date(info.Sunset * 1000);
    var SetTime = new Date(info.Time * 1000);
    var RiseDate = new Date(info.Sunrise * 1000);
    var SunsetTime = SetDate.toLocaleTimeString();
    var DataTime = SetTime .toLocaleTimeString();
    var SunriseTime = RiseDate.toLocaleTimeString(); 
    
    var Day = (SunriseTime<=DataTime && DataTime <SunsetTime); // den , danarchen shemtxvevashi yoveltvis game

  const Images = [ {
    "id": 1,
    "weather": "Thunderstorm", 
    "night_img_url": require('../assets/Night/Thunder.gif'), 
    "day_img_url":   require('../assets/Day/thunderday.gif')
  },
  {
    "id": 2,
    "weather": "Drizzle", 
    "night_img_url": require('../assets/Night/Drizzle.gif'),
    "day_img_url":   require('../assets/Day/DrizzleDay.gif')
  },
  {
    "id": 3,
    "weather": "Rain", 
    "night_img_url": require('../assets/Night/Rain2.gif'),
    "day_img_url":   require('../assets/Day/Rain3.gif')
  },
  {
    "id": 4,
    "weather": "Snow", 
    "night_img_url": require('../assets/Night/snowww.gif'),
    "day_img_url":   require('../assets/Day/Snowy.gif')
  },
  {
    "id": 5,
    "weather": "Clear", 
    "night_img_url": require('../assets/Night/clearSky.gif'),
    "day_img_url":   require('../assets/Day/Shine.jpg')
  },
  {
    "id": 6,
    "weather": "Clouds", 
    "night_img_url": require('../assets/Night/cloudsNightt.gif'),
    "day_img_url":   require('../assets/Day/cloudy.gif')
  },
  {
    "id": 7,
    "weather": "Mist" || "Smoke" || "Haze" || "Dust" || "Fog" || "Sand" || "Ash" || "Squall" || "Tornado",
    "night_img_url": require('../assets/Night/tornadonight.gif'),
    "day_img_url":   require('../assets/Day/tornadoday.gif')
  }];

    var now_weather = info.main;
    var today_weather ="" , today_image = ""; 

    for (var i = 0; i < Images.length; i++) {

          if (Day && now_weather == Images[i].weather) {
            today_weather = Images[i].weather;
            today_image =  Images[i].day_img_url; // sunsetidan  sunrisamde aris game, magitomac yvela surati iqenba gamis

    }else if (!Day && now_weather == Images[i].weather){ 
            today_weather = Images[i].weather;
            today_image =  Images[i].night_img_url;//   sunrise dan sunsetamde aris dge, magitomac yvela surati iqenba dgis
    }
  }   
    const {TemperatureTextStyle,FeelsLikeStyle, DescriptionStyle, TextStyle, ImageStyle, MainStyle} = styles;  // styles
    const {name,countryCode,main,temp,icon,desc,FeelsLike,Time} = info; 
    return(
            <View style={{justifyContent: 'space-evenly'}}>    
            <ImageBackground 
                    source={today_image}
                    style={ImageStyle}>

            <View 
                    style={{flex:1}}>

            <Header 
                    name={name} 
                    countrycode={countryCode}
            />

            <View 
                    style={{flex:0.35, alignItems: "center"}}
            >

            <Image
                    style={{marginTop: 15, width:90,height:90}} 
                    source={{ uri :("http://openweathermap.org/img/wn/" +icon+"@2x"+".png")}} 
            />

            <Text 
                    style={MainStyle}
            > 
                    {main}{"\n"}
            </Text>

            <Text 
                    style={TemperatureTextStyle}
            >
                    {temp}℃🌡  
            </Text>
            </View>

            <View>
            <Text 
                    style={DescriptionStyle}
            >
                   {' '} Today {"\n"}  {desc} {"\n"} Feels like 
                    <Text 
                    style={FeelsLikeStyle}
                    > 
                      {' '}{FeelsLike}℃ {"\n"}
                    </Text>
            </Text>
            </View>
            <View>                  
            <Text 
                    style={TextStyle}
            >

            <Text 
                    style={{color: 'yellow'}}
            >☼       
            </Text>  
                    Rise:{"\n"}{SunriseTime}{"\n"}{"\n"}  

            <Text 
                    style={{color: 'yellow'}}
            >☼
            </Text>             
                    Set:{"\n"}{SunsetTime}
                    </Text>
            </View>
            </View> 
            </ImageBackground>  
            </View>
    )
}

const styles = StyleSheet.create({

TemperatureTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 25, 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: {width: 0, height: 0},  
        textShadowRadius: 2,
        zIndex: 1, bottom: 20, left: 10
    },

FeelsLikeStyle: {
        fontSize: 20,
        color: 'red',
        marginBottom: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 3
    },

DescriptionStyle: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: 'white',   // #a4a4a2  vercxli  //  '#064c91'  is lurji
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        zIndex: 1, top: 70 , left: 0     
    },

ImageStyle: {
        width: WIDTH,
        height: HEIGHT,
},

MainStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',   // #d6dee1      vercxlisperi seri
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        zIndex: 1, bottom: 10 , right: 0

},
TextStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white', //#064c91
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        zIndex: 1, top: 190 , left: 0
        },
});

export default Home;