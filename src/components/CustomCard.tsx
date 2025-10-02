import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { globalStyles } from '../styles/styles';

type CustomCardProps = {
  title: string;
  price: number;
  image: string;
  buttonLabel: string;
  onButtonPress: () => void;
};

export default function CustomCard({ title, price, image, buttonLabel, onButtonPress }: CustomCardProps) {
  return (
    <Card style={globalStyles.card}>
      <View style={globalStyles.cardImageWrapper}>
        <Image source={{ uri: image }} style={globalStyles.cardImage} />
      </View>
      <Card.Content style={globalStyles.cardContent}>
        <Text style={globalStyles.title}>{title}</Text>
        <Text style={globalStyles.price}>${price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onButtonPress} style={globalStyles.button}>
          {buttonLabel}
        </Button>
      </Card.Actions>
    </Card>
  );
}
