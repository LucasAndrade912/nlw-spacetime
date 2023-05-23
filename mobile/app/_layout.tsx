import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import {
	Roboto_400Regular,
	Roboto_700Bold,
	useFonts,
} from '@expo-google-fonts/roboto';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

import { Stack } from 'expo-router';
import bgBlur from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';

const StyledStripes = styled(Stripes);

export default function Layout() {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState<
		boolean | null
	>(null);

	useEffect(() => {
		SecureStore.getItemAsync('token').then((token) => {
			setIsUserAuthenticated(!!token);
		});
	}, []);

	const [hasLoadedFonts] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
		BaiJamjuree_700Bold,
	});

	if (!hasLoadedFonts) return null;

	return (
		<ImageBackground
			source={bgBlur}
			className="relative flex-1 bg-zinc-900"
			imageStyle={{ position: 'absolute', left: '-100%' }}
		>
			<StyledStripes className="absolute left-2" />
			<StatusBar style="light" translucent />

			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: 'transparent' },
				}}
			>
				<Stack.Screen name="index" redirect={isUserAuthenticated} />
				<Stack.Screen name="new" />
				<Stack.Screen name="memories" />
			</Stack>
		</ImageBackground>
	);
}
