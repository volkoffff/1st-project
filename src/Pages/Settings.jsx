import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Settings() {
    return (
        <View style={{ flex: 1 }}>
            <View className="w-full px-4 flex flex-row gap-x-4 mt-8">
                <View className="aspect-square w-[28%] bg-gray-200 rounded-full"></View>
                <View>
                    <Text className="text-3xl font-bold">Pokemon user</Text>
                    <Text>pokemon@gmail.com</Text>
                </View>
            </View>
            <View className="w-full mt-8">
                <Text className="text-lg font-bold px-4 mb-1 text-gray-900">Général</Text>
                <View className="flex flex-col divide-y divide-gray-100">
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Notifications</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Langue</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Thème</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                </View>
            </View>
            <View className="w-full mt-8">
                <Text className="text-lg font-bold px-4 mb-1 text-gray-900">Account</Text>
                <View className="flex flex-col divide-y divide-gray-100">
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Email</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Photo</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                    <View className="flex flex-row justify-between items-center bg-white py-4 px-4">
                        <Text>Name</Text>
                        <Ionicons name="chevron-forward-outline" />
                    </View>
                </View>
            </View>
        </View>
    )
}