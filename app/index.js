import { useState } from 'react';
import { View, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES} from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';
import VerticalScrollBar from '../components/common/scrollbar/VerticalScrollBar';

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("Full-time");
    
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            Alert.alert(
                "Empty Search",
                "Please enter a job title or keyword to search",
                [{ text: "OK" }]
            );
            return;
        }
        router.push(`/search/${searchTerm.trim()}`);
    };

    const handleJobTypeSelect = (jobType) => {
        setSelectedJobType(jobType);
        // You can add additional logic here if needed
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite}, headerShadowVisible: false, headerLeft:() => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
                    ),
                    headerRight:() => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
                    ),
                    headerTitle: ""
                }}
            />

            <VerticalScrollBar 
                contentContainerStyle={styles.scrollViewContent}
            >
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={handleSearch}
                        onJobTypeSelect={handleJobTypeSelect}
                    />
                    <Popularjobs jobType={selectedJobType} />
                    <Nearbyjobs jobType={selectedJobType} />
                </View>
            </VerticalScrollBar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    }
});

export default Home;