import React from 'react';
import { Text, Image} from 'react-native';
import { Appbar} from 'react-native-paper';

const Header = ({name,countrycode}) =>{
    
    return(
        <Appbar.Header 
        theme ={{colors:{primary:'transparent'}}} 
       >
            {countrycode ?  <Image  
            source={{uri:`https://www.countryflags.io/${countrycode}/flat/64.png`}} style={{ marginLeft:10, width:32,height:32}}/> : <Text></Text>} 
            <Appbar.Content 
            style={{alignItems: "center", marginRight: 50}}
            title={name} 
            subtitle="Weather"
            color = 'white'
            />      
        </Appbar.Header>
    )
}

export default Header;