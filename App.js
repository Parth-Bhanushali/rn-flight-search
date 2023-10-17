import 'react-native-gesture-handler'  // do not touch or delete!
import {StatusBar, SafeAreaView} from 'react-native'

import AppNavigator from './src/navigators/AppNavigator';
import {COLORS} from './constants';

export default function App() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle={'dark-content'} backgroundColor='white' />
            <AppNavigator />
        </SafeAreaView>
    );
}