import React from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import style from '../assets/style'

const db = SQLite.openDatabase({name:'mynote'}, ()=>console.log('CONNECTED ITEM'))

const ItemScreen = function({ route, navigation }) {
    const id_nota = route.params.id_nota;
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [color, setColor] = useState('')

    const setStates = function(titulo, descripcion, color) {
        setTitulo(titulo)
        setDescripcion(descripcion)
        setColor(color)
    }

    function onModificarPress() {
        navigation.navigate('modificarScreen', {id_nota})
    }

    function onEliminarPress() {
        Alert.alert('¿Desea elminar?',
            '¿Está seguro que desea elminar la nota?\nEsta acción no se puede deshacer',
            [
                {
                    text: 'No'
                },
                {
                    text: "Sí",
                    onPress: (v) => {
                        db.transaction(tx => {
                            tx.executeSql(
                                'DELETE FROM notas WHERE id_nota = ?',
                                [id_nota],
                                (tx, res) => {
                                    if (res.rowsAffected === 0) {
                                        Alert.alert('Error al eliminar', 'No se eliminó la nota')
                                        return;
                                    }

                                    navigation.goBack()
                                },
                                error => console.log(error)
                            )
                        })
                    }
                }
            ])
    }

    useEffect(function(){
        navigation.addListener('focus', function() {
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM notas WHERE id_nota = ?",
                [id_nota],
                function(tx2, res) {
                    if (res.rows.length === 0) {
                        alert("No se encontró la nota");
                        return;
                    }
                    let row = res.rows.item(0)
                    setStates(row.titulo, row.descripcion, row.color)
                },
                error => console.log({error}))
            })
        })
    }, [navigation]);

    return (
        <SafeAreaView style={style.form}>
            <View style={{backgroundColor: color, padding: 5}}>
                <Text style={style.dataLabel}>Titulo</Text>
                <Text style={style.dataContent}>{titulo}</Text>
                <Text style={style.dataLabel}>Descripcion</Text>
                <Text style={style.dataContent}>{descripcion}</Text>
            </View>
            <View style={{marginTop:10}}>
                <Button color= '#00d1b2' title="Modificar" onPress={onModificarPress} />
                <Button color= '#ff3860' title="Eliminar" onPress={onEliminarPress} />
            </View>
        </SafeAreaView>
    );
}

export default ItemScreen;
