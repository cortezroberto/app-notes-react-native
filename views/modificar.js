import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput } from 'react-native'
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

    return (
        <SafeAreaView>
            <Text>Nombre</Text>
            <TextInput style={style.textInput} value={nombre} onChangeText={setNombre} />
            <Text>Teléfono</Text>
            <TextInput style={style.textInput} value={telefono} onChangeText={setTelefono} />
        </SafeAreaView>
    )
}

export default ModificarScreen;