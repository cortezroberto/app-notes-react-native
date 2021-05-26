import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, TextInput, View } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style';

const db = SQLite.openDatabase({name:'mydata'})

const ModificarScreen = function({ route, navigation})
{
    const id_contacto = route.params.id_contacto;
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')

    function setContacto(_nombre, _telefono) {
        setNombre(_nombre)
        setTelefono(_telefono)
    }

    useEffect(function() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM contactos WHERE id_contacto = ?',
                [id_contacto],
                function(tx, result) {
                    if (result.rows.length == 0) {
                        Alert.alert("No existe el contacto para modificar");
                        navigation.goBack();
                        return;
                    }

                    let registro = result.rows.item(0)
                    setContacto(registro.nombre, registro.telefono)
                }
            )
        })
    }, [])

    function onGuardarPress() {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE contactos SET nombre = ?, telefono = ? WHERE id_contacto = ?',
                [nombre, telefono, id_contacto],
                (tx, result) => {
                    if (result.rowsAffected.length === 0) {
                        Alert.alert('No se actualizaron los datos. Intente de nuevo')
                        return;
                    }
                    
                    Alert.alert('Datos actualizados correctamente')
                    navigation.goBack()
                },
                error => console.log(error)
            )
        })
    }

    return (
        <SafeAreaView>
            <View style={style.form}>
                <Text>Nombre</Text>
                <TextInput style={style.textInput} value={nombre} onChangeText={setNombre} />
                <Text>Teléfono</Text>
                <TextInput style={style.textInput} value={telefono} onChangeText={setTelefono} />
                <Button title="Guardar" onPress={onGuardarPress} />
            </View>
        </SafeAreaView>
    )
}

export default ModificarScreen;