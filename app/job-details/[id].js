import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch1 from "../../hook/useFetch1";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch1('job-details', {
        job_id: params.id,
        extended_publisher_details: 'true'
    });

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const displayTabContent = () => {
        if (!data || data.length === 0) return null;

        const jobData = data[0];
        switch (activeTab) {
            case "About":
                return <JobAbout 
                            info={jobData.job_description ?? "No description available"} 
                        />;
            case "Qualifications":
                return <Specifics 
                            title="Qualifications"
                            points={jobData.job_highlights?.Qualifications ?? ['No qualifications specified']}
                        />;
            case "Responsibilities":
                return <Specifics 
                            title="Responsibilities"
                            points={jobData.job_highlights?.Responsibilities ?? ['No responsibilities specified']}
                        />;
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />
            <>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                >
                    {isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.medium }}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                    ) : error ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.medium }}>
                            <Text style={{ color: COLORS.error, textAlign: 'center', marginBottom: SIZES.medium }}>
                                Error: {error}
                            </Text>
                            <TouchableOpacity 
                                style={{ backgroundColor: COLORS.primary, padding: SIZES.medium, borderRadius: SIZES.small }}
                                onPress={refetch}
                            >
                                <Text style={{ color: COLORS.white, textAlign: 'center', fontWeight: 'bold' }}>
                                    Retry
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : !data || data.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.medium }}>
                            <Text style={{ color: COLORS.error, textAlign: 'center' }}>
                                No job details found
                            </Text>
                        </View>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                Location={data[0].job_country}
                            />
                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                {data && data.length > 0 && (
                    <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
                )}
            </>
        </SafeAreaView>
    )
}

export default JobDetails;
