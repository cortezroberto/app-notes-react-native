import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style';
import {Picker} from '@react-native-picker/picker';


const db = SQLite.openDatabase({name:'mynote'})

const ModificarScreen = function({ route, navigation})
{
    const id_nota = route.params.id_nota;
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [color, setColor] = useState('')

    function setNota(_titulo, _descripcion,_color) {
        setTitulo(_titulo)
        setDescripcion(_descripcion)
        setColor(_color)
    }

    // useEffect(function() {
    //     // db.transaction((tx) => {
    //     //     tx.executeSql(
    //     //         'SELECT * FROM notas WHERE id_nota = ?',
    //     //         [id_nota],
    //     //         function(tx, result) {
    //     //             if (result.rows.length == 0) {
    //     //                 Alert.alert("No existe la nota a modificar");
    //     //                 navigation.goBack();
    //     //                 return;
    //     //             }

    //     //             let registro = result.rows.item(0)
    //     //             setContacto(registro.titulo, registro.descripcion, registro.color)
    //     //         }
    //     //     )
    //     // })
    // }, [])

    function onGuardarPress() {
        fetch(`http://192.168.1.110:3000/actualizarPorId/${id_nota}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({titulo,descripcion,color})
        })
        .then(resp => resp.json())
        .then(data=> {
            console.log(data)
            navigation.goBack();
        })
        .catch(err=>console.log(err))

        // db.transaction(tx => {
        //     tx.executeSql(
        //         'UPDATE notas SET titulo = ?, descripcion = ?, color= ? WHERE id_nota = ?',
        //         [titulo, descripcion, color, id_nota],
        //         (tx, result) => {
        //             if (result.rowsAffected.length === 0) {
        //                 Alert.alert('No se actualizaron los datos. Intente de nuevo')
        //                 return;
        //             }
                    
        //             Alert.alert('Datos actualizados correctamente')
        //             navigation.goBack()
        //         },
        //         error => console.log(error)
        //     )
        // })
    }

    return (
        <SafeAreaView>
            <View style={style.form}>
                <Text>Titulo</Text>
                <TextInput style={style.textInput} value={titulo} onChangeText={setTitulo} />
                <Text>Descripcion</Text>
                <TextInput multiline={true} numberOfLines={6} style={style.textInput} value={descripcion} onChangeText={setDescripcion} />
                <Picker selectedValue={color} onValueChange={(itemValue) => setColor(itemValue)}>
                    <Picker.Item label="Elige:" style={{color: "#000000"}}/>
                    <Picker.Item label="Aqua" value="#209cee" style={{color: "#209cee"}}/>
                    <Picker.Item label="Green" value="#23d160" style={{color: "#23d160"}}/>
                    <Picker.Item label="Black" value="#000000" style={{color: "#000000"}}/>
                    <Picker.Item label="Dark" value="#363636" style={{color: "#363636"}}/>
                    <Picker.Item label="Blue" value="#3273dc" style={{color: "#3273dc"}}/>
                    <Picker.Item label="Red" value="#ff3860" style={{color: "#ff3860"}}/>
                    <Picker.Item label="Yellow" value="#ffdd57" style={{color: "#ffdd57"}}/>
                </Picker>
                <Button color= '#00d1b2' title="Guardar" onPress={onGuardarPress} />
            </View>
        </SafeAreaView>
    )
}

export default ModificarScreen;
