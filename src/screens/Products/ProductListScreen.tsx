import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { getProducts } from '../../services/productService';
import { addFavorite, removeFavorite, getUserFavorites } from '../../services/favoriteService';
import { auth } from '../../config/firebaseConfig';

export default function ProductListScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
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

  const fetchFavorites = async () => {
    const favs = await getUserFavorites(auth.currentUser!.uid);
    setFavorites(favs);
  };

  const toggleFavorite = async (productId: number) => {
    if (favorites.includes(productId)) {
      await removeFavorite(auth.currentUser!.uid, productId);
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      await addFavorite(auth.currentUser!.uid, productId);
      setFavorites([...favorites, productId]);
    }
  };

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text variant="titleMedium">{item.title}</Text>
        <Text>${item.price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => toggleFavorite(item.id)}>
          {favorites.includes(item.id) ? 'Remover dos Favoritos' : 'Favoritar'}
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) return <Text>Carregando produtos...</Text>;

  return <FlatList data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={styles.list} />;
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { marginBottom: 12 },
});
