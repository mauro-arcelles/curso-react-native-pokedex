import React from 'react';
import { FlatList, Platform, Text, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/AppTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()))
      );
    } else {
      const pokemonById = simplePokemonList.find((pokemon) => pokemon.id === term);
      setPokemonFiltered(
        pokemonById ? [pokemonById] : []
      );
    }


  }, [term]);


  if (isFetching) {
    return (
      <Loading />
    );
  }

  return (
    <View style={{
      flex: 1
    }}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30
        }}
      />

      <FlatList
        style={{
          marginBottom: 60
        }}
        data={pokemonFiltered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}

        // Header
        ListHeaderComponent={() => (
          <Text style={{
            ...styles.globalMargin,
            ...styles.title,
            paddingBottom: 10,
            marginTop: Platform.OS === 'ios' ? top + 60 : top + 80
          }}>{term}</Text>
        )}

        renderItem={({ item }) => <PokemonCard pokemon={item} />}

      />
    </View>
  );
};

export default SearchScreen;

