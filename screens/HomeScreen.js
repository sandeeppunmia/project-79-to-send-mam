import React,{Component} from 'react';
import {View,Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import db from '../config';
import firebasee from 'firebase';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class ExchangeScreen extends Component{
   
constructor(){
    super();
    this.state={
        allRequests : []
    }
    this.requestRef = null
}

getAllRequests = () =>{
    this.requestRef = db.collection("itemRequests")
    .onSnapshot((snapshot)=>{
        var allRequests = snapshot.docs.map(document => document.data());
        this.setState({
            allRequests : allRequests
        })
    })
}

keyExtractor = (item, index) => index.toString()

renderItem = ( {item,i}) => {
    console.log(item.itemName);
    return(
        <ListItem
        key={i}
        title={item.itemName}
        subtitle={item.description}
        titleStyle={{ color:'black', fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity style={styles.button}>
                <Text style={{color:'#ffff'}}>Donate</Text>
            </TouchableOpacity>
        }
        bottomDivider/>
    )
}

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="DONATE ITEMS"/>
                 <View style={{flex:1}}>
                     {
                         this.state.allRequests.length === 0
                         ?(
                             <View style={{flex:1, fontSize:20, justifyContent:'center',alignItems:'center'}}>
                                 <Text style={{fontSize:20}}>List of all requested items</Text>
                            </View>
                         )
                         :(
                             <FlatList
                               keyExtractor={this.keyExtractor}
                               data={this.state.allRequests}
                               renderItem={this.renderItem}
                               />
                         )
                     }
                 </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ff5722',
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:8
        }
    }
})