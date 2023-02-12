import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/AppTheme';
import { usePokemonPagination } from '../hooks/usePokemonPagination';
import { FlatList } from 'react-native-gesture-handler';
import { PokemonCard } from '../components/PokemonCard';
import { ActivityIndicator, Image, Text, View } from 'react-native';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPagination();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBg}
      />

      <View style={{
        alignItems: 'center'
      }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}

          // Header
          ListHeaderComponent={() => (
            <Text style={{
              ...styles.globalMargin,
              ...styles.title,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 10
            }}>Pokedex</Text>
          )}

          renderItem={({ item }) => <PokemonCard pokemon={item} />}

          // infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}

          ListFooterComponent={<ActivityIndicator style={{ height: 100 }} size={40} color="grey" />}
        />
      </View>

    </>
  );
};
