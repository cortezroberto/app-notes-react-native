
import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style'
import {Picker} from '@react-native-picker/picker';


const db = SQLite.openDatabase({name:'mynote'})

const AgregarScreen = function({ navigation }) {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [color, setColor] = useState('')

    const btnAgregarOnPress = function() {
        console.log({titulo, descripcion, color})
        if (!titulo) {
            Alert.alert('Favor de poner el titulo');
            return;
        }
        if (!descripcion) {
            Alert.alert('Favor de poner la descripcion');
            return;
        }
        if (!color) {
            Alert.alert('Favor de poner el color');
            return;
        }

        db.transaction(function(t) {
            t.executeSql("INSERT INTO notas (id_nota, titulo, descripcion, color) VALUES (null,?,?,?)",
                [titulo, descripcion,color],
                function(tx, res) {
                    console.log(res)
                    Alert.alert('¡Nota guardada!')
                    navigation.goBack()
                },
                error => console.log({error})
            );
        });
    }

    return (
        <SafeAreaView>
            <View style={style.form}>
                <Text>Titulo</Text>
                <TextInput style={style.textInput} value={titulo} onChangeText={t => setTitulo(t)} />
                <Text>Descripcion</Text>
                <TextInput  multiline={true} numberOfLines={6} style={style.textInput} value={descripcion} onChangeText={t => setDescripcion(t)} />
                <Text>Color</Text>
                <Picker style={{marginBottom: 10}} selectedValue={color} onValueChange={(itemValue) => setColor(itemValue)}>
                    <Picker.Item label="Elige:" style={{color: "#000000"}}/>
                    <Picker.Item label="Aqua" value="#209cee" style={{color: "#209cee"}}/>
                    <Picker.Item label="Green" value="#23d160" style={{color: "#23d160"}}/>
                    <Picker.Item label="Black" value="#000000" style={{color: "#000000"}}/>
                    <Picker.Item label="Dark" value="#363636" style={{color: "#363636"}}/>
                    <Picker.Item label="Blue" value="#3273dc" style={{color: "#3273dc"}}/>
                    <Picker.Item label="Red" value="#ff3860" style={{color: "#ff3860"}}/>
                    <Picker.Item label="Yellow" value="#ffdd57" style={{color: "#ffdd57"}}/>
                </Picker>
                <Button color= '#00d1b2' title="Agregar" onPress={btnAgregarOnPress} />
            </View>
        </SafeAreaView>
    )
}

export default AgregarScreen;