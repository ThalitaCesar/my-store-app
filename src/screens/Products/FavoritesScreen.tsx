import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { getProducts } from '../../services/productService';
import { useFavorites } from '../../contexts/FavoritesContext';
import { globalStyles as styles } from '../../styles/styles';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/Products';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts.filter(p => favorites.includes(p.id)));
    };
    loadProducts();
  }, [favorites]);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      buttonLabel="Remover dos Favoritos"
      onButtonPress={() => removeFromFavorites(item.id)}
    />
  );

  return (
    <View style={styles.container}>
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
