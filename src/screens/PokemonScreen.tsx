import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigator/Tab1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ route, navigation }: Props) => {

  const { simplePokemon, color } = route.params;

  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon: fullPokemon } = usePokemon(simplePokemon.id);

  return (
    <View style={{ flex: 1 }}>

      <View style={{
        ...styles.headerContainer,
        backgroundColor: color
      }}>

        <View style={{
          ...styles.backButton,
          top: top + 5
        }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.pop()}
          >
            <Icon
              name="arrow-back-outline"
              color="black"
              size={40}
            />
          </TouchableOpacity>
        </View>

        <Text style={{
          ...styles.pokemonName,
          top: top + 45
        }}>
          {simplePokemon.name} {'\n#' + simplePokemon.id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        <FadeInImage
          uri={simplePokemon.picture}
          style={styles.pokemonImage}
        />

      </View>

      {
        isLoading
          ? (<View style={styles.activityIndicator}>
            <ActivityIndicator color={color} size={50} />
          </View>
          )
          : <PokemonDetails pokemon={fullPokemon} />
      }



    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 0
  },
  pokemonName: {
    color: 'black',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
