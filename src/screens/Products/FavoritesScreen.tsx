import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { auth } from '../../config/firebaseConfig';
import { getUserFavorites } from '../../services/favoriteService';
import { getProducts } from '../../services/productService';
import { Product } from '../../types/Products';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const favIds = await getUserFavorites(auth.currentUser!.uid);
      const allProducts = await getProducts();
      const favProducts = allProducts.filter((p: Product) => favIds.includes(p.id));
      setFavorites(favProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const renderItem = ({ item }: { item: Product }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text variant="titleMedium">{item.title}</Text>
        <Text>${item.price}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) return <Text>Carregando favoritos...</Text>;
  if (favorites.length === 0) return <Text style={styles.empty}>Nenhum favorito ainda.</Text>;

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 20 },
});
