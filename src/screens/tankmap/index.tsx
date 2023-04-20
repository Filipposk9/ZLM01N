import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../appearance/styles/TankMapStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import Repository from '../../data/Repository';
import {Tank} from '../../shared/Types';

function TankMap({navigation}: {navigation: any}): JSX.Element {
  const [tanks, setTanks] = useState<Tank[]>([]);

  useEffect(() => {
    const getTankList = async () => {
      const tankList = await Repository.getTanks();

      if (tankList) {
        setTanks(tankList);
      }
    };

    // getTankList();
  }, []);

  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles(theme).tankMapContainer}>
      {/* <View style={styles(theme).tankContainer}>
        <Text style={{color: 'white'}}>CB123</Text>
      </View> */}

      {/* <SvgUri
        width="200"
        height="200"
        // source={{
        //   uri: 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
        // }}
        // source={require('../../appearance/assets/TanksTopViewB.svg')}
      /> */}
    </View>
  );
}

export default React.memo(TankMap);
