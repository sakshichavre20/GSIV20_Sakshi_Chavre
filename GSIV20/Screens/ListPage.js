import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../Constants/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fetchMovies} from '../ApiContent';

const ListPage = (props) => {

  const [upcomming,setUpcomming]=useState([]);
  const [query,setQuery]=useState("");
  const [fullData,setFullData]=useState([upcomming]);

  useEffect(() => {
    const fetchAPI = async () => {
      setUpcomming(await fetchMovies());
    }
    fetchAPI();
  }, []);

//  const handelSearch = text => {
//     // console.log('text',text);
//     const formatQuery = text.toLowerCase();
//     const data = data.filter(setFullData, user => {
//         return Contains(formatQuery, user)
//     });
//     setQuery({ query: formatQuery});


//   };

    return (
      <View style={{...styles.container}}>
        {/*-------------------header-----------------*/}
        <View style={styles.search_header}>
          <View style={styles.searchbar}>
            <MaterialIcons name="search" size={22} color={Colors.LightGray} />
            <TextInput placeholder="Search" />
            {/* onChangeText={handelSearch} */}
          </View>
        </View>
        {/*-------------------flatlist-----------------*/}
        <FlatList
          style={{marginTop: 10}}
          keyExtractor={item => item.id}
          data={upcomming}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() =>
                  props.navigation.navigate('DetailsPage', {item})
                }>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    elevation: 10,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: item.backPoster}}
                    style={{
                      height: 170,
                      width: '100%',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginTop: 10,
                    }}>
                    <Text style={styles.bluetext} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={{...styles.bluetext, color: Colors.LightGray}}>
                      {item.rating}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.bluetext,
                      color: Colors.LightGray,
                      paddingLeft: 10,
                      paddingBottom: 30,
                    }}
                    numberOfLines={2}>
                    {item.overview}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
}

export default ListPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search_header: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
  },
  searchbar: {
    width: '95%',
    backgroundColor: Colors.Disabled,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: '50%',
    height: 260,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  bluetext:{
    color:Colors.Blue,
    fontSize:13
  }
});
