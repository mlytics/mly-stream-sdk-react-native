import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import MlyPlayer from './MlyPlayer.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  requireNativeComponent,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const initDriver = () => {
    const clientID = 'cegh8d9j11u91ba1u600';
    const sampleRate = 0.5;
    const debug = true;
    const result = NativeModules.MLYDriver.initialize({
      clientID,
      sampleRate,
      debug,
    });
    console.log('MLYSDK initialize result:', result);
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const abr =
    'https://vsp-stream.s3.ap-northeast-1.amazonaws.com/HLS/raw/SpaceX.m3u8';

  const [src, setSrc] = useState(abr);

  const [autoplay, setAutoplay] = useState(false);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={{aspectRatio: 16 / 9, width: '100%'}}>
            <MlyPlayer
              src={src}
              controls={true}
              muted={false}
              isLoaderAllowed={true}
              isMonitorAllowed={true}
              autoplay={autoplay}
            />
          </View>

          <Section title="Initialize Driver">
            <Button onPress={initDriver} title="Initialize" color="#841584" />
          </Section>
          <Section title="Play / Pause">
            <Button
              onPress={() => setAutoplay(!autoplay)}
              title={autoplay ? 'Pause' : 'Play'}
              color="#841584"
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
