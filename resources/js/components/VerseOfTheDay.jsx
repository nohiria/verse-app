import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";

export default function VerseOfTheDay() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVerse = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://verse-app.local/api/verse-of-the-day");
      setVerse(response.data);
    } catch (error) {
      console.error("Error fetching verse:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4F46E5" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-xl font-bold text-center">{verse.text}</Text>
      <Text className="text-lg text-gray-600 text-center mt-2">
        {verse.book} {verse.chapter}:{verse.verse}
      </Text>
      <TouchableOpacity onPress={fetchVerse} className="mt-4 bg-blue-600 px-4 py-2 rounded">
        <Text className="text-white font-semibold">Actualizar Verso</Text>
      </TouchableOpacity>
    </View>
  );
}
