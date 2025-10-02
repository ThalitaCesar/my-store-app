import EStyleSheet from 'react-native-extended-stylesheet';

export const globalStyles = EStyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '$background',
  padding: '$spacingMd',
},
card: {
  marginBottom: '$spacingMd',
  backgroundColor: '$surface',
  borderRadius: '$radiiMd', 
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
titleCard: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: '$spacingSm',
  color: '$text',
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: '$spacingSm',
  color: '$text',
  textAlign: 'center',
},
price: {
  fontSize: 18,
  fontWeight: '600',
  color: '$primary',
},
button: {
  borderRadius: '$radiiSm',
},
emptyText: {
  textAlign: 'center',
  marginTop: '$spacingLg',
  fontSize: 16,
  color: '$text',
},
linkContainer: {
  marginTop: '$spacingLg',
  alignItems: 'center',
},
linkText: {
  fontSize: 16,
  textAlign: 'center',
  color: '$text', 
},
link: {
  fontSize: 16,
  color: '$primary',
  textAlign: 'center',
},

});
