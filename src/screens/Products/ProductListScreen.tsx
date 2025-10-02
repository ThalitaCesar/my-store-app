import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { getProducts } from '../../services/productService';
import { useFavorites } from '../../contexts/FavoritesContext';
import { globalStyles as styles } from '../../styles/styles';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/Products';

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
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

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      buttonLabel={favorites.includes(item.id) ? 'Remover dos Favoritos' : 'Favoritar'}
      onButtonPress={() => toggleFavorite(item.id)}
    />
  );

  if (loading) return <Text style={styles.emptyText}>Carregando produtos...</Text>;

  return (
    <View style={styles.container}>
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
