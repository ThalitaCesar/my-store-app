import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { globalStyles } from '../styles/styles';
import { Product } from '../types/Products';

type ProductCardProps = {
  product: Product;
  onButtonPress: () => void;
  buttonLabel: string;
};

export default function ProductCard({ product, onButtonPress, buttonLabel }: ProductCardProps) {
  return (
    <Card style={globalStyles.card}>
      <View style={globalStyles.cardImageWrapper}>
        <Image source={{ uri: product.image }} style={globalStyles.cardImage} />
      </View>
      <Card.Content style={globalStyles.cardContent}>
        <Text style={globalStyles.titleCard}>{product.title}</Text>
        <Text style={globalStyles.price}>${product.price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onButtonPress} style={globalStyles.button}>
          {buttonLabel}
        </Button>
      </Card.Actions>
    </Card>
  );
}
