import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Types y peso */}
      <View style={{
        ...styles.container,
        marginTop: 350
      }}>
        {/* Types */}
        <Text style={styles.title}>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.types.map((type, index) => {
              return (
                <Text key={index} style={{ ...styles.regularText, marginRight: 10 }}>
                  {type.type.name}
                </Text>
              );
            })
          }
        </View>
        {/* Peso */}
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>

      {/* Sprites */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Habilidades */}
      <View style={styles.container}>
        <Text style={{ ...styles.title, marginTop: 0 }}>Habilidades base</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.abilities.map((ability, index) => {
              return (
                <Text key={index} style={{ ...styles.regularText, marginRight: 10 }}>
                  {ability.ability.name}
                </Text>
              );
            })
          }
        </View>
      </View>

      {/* Movimientos */}
      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            pokemon.moves.map((move, index) => {
              return (
                <Text key={index} style={{ ...styles.regularText, marginRight: 10 }}>
                  {move.move.name}
                </Text>
              );
            })
          }
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {
            pokemon.stats.map((stat, index) => {
              return (
                <View
                  key={stat.stat.name + index}
                  style={{ flexDirection: 'row' }}
                >
                  <Text style={{ ...styles.regularText, marginRight: 10, width: 150 }}>
                    {stat.stat.name}
                  </Text>
                  <Text style={{ ...styles.regularText, fontWeight: 'bold' }}>
                    {stat.base_stat}
                  </Text>
                </View>
              );
            })
          }

          <View style={{
            marginBottom: 20,
            alignItems: 'center'
          }}>
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
          </View>

        </View>
      </View>


    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20
  },
  regularText: {
    fontSize: 17,
    color: 'black'
  },
  basicSprite: {
    width: 100,
    height: 100
  }
});
