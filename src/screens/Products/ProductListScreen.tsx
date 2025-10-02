import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { getProducts } from '../../services/productService';
import { useFavorites } from '../../contexts/FavoritesContext';
import { globalStyles as styles } from '../../styles/styles';

export default function ProductListScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (productId: number) => {
    if (favorites.includes(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => toggleFavorite(item.id)} style={styles.button}>
          {favorites.includes(item.id) ? 'Remover dos Favoritos' : 'Favoritar'}
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) return <Text style={styles.emptyText}>Carregando produtos...</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
    </View>
  );
}
