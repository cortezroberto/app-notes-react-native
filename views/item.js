import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import style from '../assets/style'

const db = SQLite.openDatabase({name:'mydata'}, ()=>console.log('CONNECTED ITEM'))

const ItemScreen = function({ route, navigation }) {
    const id_contacto = route.params.id_contacto;
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')

    const setStates = function(nombre, telefono) {
        setNombre(nombre)
        setTelefono(telefono)
    }

    function onModificarPress() {
        navigation.navigate('modificarScreen', {id_contacto})
    }

    useEffect(function(){
        navigation.addListener('focus', function() {
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM contactos WHERE id_contacto = ?",
                [id_contacto],
                function(tx2, res) {
                    if (res.rows.length === 0) {
                        alert("No se encontró el contacto");
                        return;
                    }
                    let row = res.rows.item(0)
                    setStates(row.nombre, row.telefono)
                },
                error => console.log({error}))
            })
        })
    }, [navigation]);

    return (
        <SafeAreaView>
            <View style={style.dataBox}>
                <Text style={style.dataLabel}>Nombre</Text>
                <Text style={style.dataContent}>{nombre}</Text>
                <Text style={style.dataLabel}>Teléfono</Text>
                <Text style={style.dataContent}>{telefono}</Text>
            </View>
            <Button title="Modificar" onPress={onModificarPress} />
        </SafeAreaView>
    );
}

export default ItemScreen;