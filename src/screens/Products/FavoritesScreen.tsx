import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getProducts } from '../../services/productService';
import { globalStyles as styles } from '../../styles/styles';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts.filter(p => favorites.includes(p.id)));
    };
    loadProducts();
  }, [favorites]);

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => removeFromFavorites(item.id)} style={styles.button}>
          Remover dos Favoritos
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum favorito ainda.</Text>}
      />
    </View>
  );
}
