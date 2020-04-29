// მესამე გვერდის ჩაშენება გადავიფიქრე

// import React, { Component } from 'react';
// import { Text, View , StyleSheet} from 'react-native';

// export default class Clock extends Component {
//   constructor(props) {
//     super(props);
//     var date = new Date().getDate(); 
//     var month = new Date().getMonth() + 1; 
//     var year = new Date().getFullYear(); 
//     var hours = new Date().getHours();
//     var min = new Date().getMinutes();
//     var sec = new Date().getSeconds();
//     this.state = {
//       // date: hours + ':' + min + ':' + sec   // Use this , if i need only HH.MM.SS
//       date: date + '/' + month + '/' + year + "  " + hours + ':' + min + ':' + sec  // Use this , if i need full date
//     };
//   }
//   componentDidMount(){ 
//     setInterval(() => (
//       this.setState(
//         // { curTime : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}   // clocks without date 
//         { curTime : new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + "\n" + "\n" +   new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}
//         )
//     ), 1000);
//   }
// // state = {curTime:new Date().toLocaleString()};
//    render() {
//      return (        
//        <View                                
//         style   ={{
//           flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                  }}>
//        <Text  
//         style   ={styles.TimeStyle}>
//             Current Time: {"\n"} {"\n"}
//                  {this.state.curTime}
//        </Text>
//        </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     TimeStyle: {
//       fontSize: 25,
//       textAlign: 'center',
//           color: '#064c91',
//           marginBottom: 50,
//           textShadowColor: 'rgba(0, 0, 0, 0.75)',
//           textShadowOffset: {width: -4, height: 3},
//           textShadowRadius: 10
//     }
// });