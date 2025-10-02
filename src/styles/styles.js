import EStyleSheet from 'react-native-extended-stylesheet';

export const globalStyles = EStyleSheet.create({
card: {
  marginBottom: '$spacingMd',
  backgroundColor: '$surface',
  borderRadius: '$radiiMd', 
   marginHorizontal: '$spacingMd',
},
cardImageWrapper: {
  overflow: 'hidden',
  borderTopLeftRadius: '$radiiMd',
  borderTopRightRadius: '$radiiMd',
},
cardImage: {
  height: 200,
  width: '100%',
  resizeMode: 'cover',
},
cardContent: {
  paddingVertical: '$spacingMd',
  paddingHorizontal: '$spacingSm',
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: '$spacingSm',
  color: '$text',
},
price: {
  fontSize: 18,
  fontWeight: '600',
  color: '$primary',
},
button: {
  borderRadius: '$radiiSm',
},
});
