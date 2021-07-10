import React,{useState,useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../Constants/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fetchMovies, fetchMovieDetail, fetchCasts} from '../ApiContent';
import axios from 'axios';

const DetailsPage = ({navigation,route}) => {
  const {item} =route.params;
  
  
   const [detail, setDetail] = useState([]);
 
   const [casts, setCasts] = useState([]);
   

     useEffect(() => {
       const fetchAPI = async () => {
         setDetail(await fetchMovieDetail(item.id));
        
         setCasts(await fetchCasts(item.id));
       
       };

       fetchAPI();
     }, [item.id]);







    return (
      <View style={styles.container}>
        {/*-------------------header-----------------*/}
        <View style={styles.search_header}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={Colors.LightGray}
            onPress={() => navigation.goBack()}
          />
          <Text style={{color: Colors.LightGray, paddingLeft: 10}}>Back</Text>
        </View>
        {/*-------------------detail-----------------*/}
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            flexGrow: 1,
          }}>
          <Image
            source={{uri: item.backPoster}}
            style={{
              height: '50%',
              width: '100%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Text style={{...styles.Title}} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{...styles.SubTitle, paddingLeft: 10}}>
              ({item.rating})
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Text style={{...styles.SubTitle}} numberOfLines={1}>
              {item.year} |
            </Text>
            <Text style={{...styles.SubTitle, paddingLeft: 10}}>
             
            </Text>
          </View>
          <Text style={{fontSize: 13, paddingTop: 10}}>
            Description: {item.overview}
          </Text>
        </View>
      </View>
    );
}

export default DetailsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search_header: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 20,
    flexDirection: 'row',
  },
  Title: {
    color: Colors.Gray,
    fontSize: 16,
    fontWeight: '700',
  },
  SubTitle: {
    color: Colors.Gray,
    fontSize: 13,
    fontWeight: '600',
  },
});

