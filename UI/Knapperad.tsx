import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';

const Knapperad = ({children}: PropsWithChildren) => {
  return (
    <View
      style={{
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 5,
      }}>
      {children}
    </View>
  );
};
export default Knapperad;
