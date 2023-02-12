import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';


const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then(colors => {
        if (!isMounted.current) return;
        switch (colors.platform) {
          case 'android':
            setBgColor(colors.dominant || 'grey');
            break;
          case 'ios':
            setBgColor(colors.background || 'grey');
            break;
        }
      });

    return () => {
      isMounted.current = false;
    };

  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonScreen', {
        simplePokemon: pokemon,
        color: bgColor
      })}
      activeOpacity={0.8}
    >
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor
        }}
      >

        <View>
          <Text style={styles.name}
          >
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
        />

      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    backgroundColor: 'grey',
    height: 120,
    marginBottom: 25,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -8
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5
  }
});
