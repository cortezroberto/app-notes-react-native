import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { color } from 'react-native-reanimated';
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style'

const db = SQLite.openDatabase({name:'mynote'});


const InicioScreen = function({ navigation }) {

    const [notas, setNotas] = useState([]);

    useEffect(function() {
        navigation.addListener('focus', function() {
            fetch(`http://192.168.1.110:3000/consultar`)
            .then(resp => resp.json())
            .then(({data}) => setNotas(data))
            .catch(err=>console.log(err))
            // db.transaction(function(t) {
            //     t.executeSql("SELECT * FROM notas",[], function(tx, res) {
            //         let data = [];
            //         for (let i = 0; i < res.rows.length; i++) {
            //             data.push(res.rows.item(i));
            //         }
            //         setNotas(data);
            //     }, (error) => { console.log({ error }) });
            // });
        })
    }, [navigation]);

    const notaItem = function({ item }) {
        const onPress = function() {
            navigation.navigate('itemScreen', {id_nota:item.id_nota})
        }
        return (
            <TouchableOpacity onPress={onPress} style={{backgroundColor: item.color, margin: 10, padding:10, height: 100, borderWidth: 1}}>
                <Text style={style.itemNotaTitle}>{item.titulo}</Text>
                <Text style={style.itemNotaDetails}>{item.descripcion}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView>
            <Button color= '#00d1b2' title="Nueva +" onPress={()=>navigation.navigate('agregarScreen')} />
            <FlatList
                data={notas}
                renderItem={notaItem}
                keyExtractor={i=>i.id_nota}
            />
        </SafeAreaView>
    )
}

export default InicioScreen;
