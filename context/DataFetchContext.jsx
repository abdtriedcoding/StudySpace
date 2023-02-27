import { MapPost } from "@/components/MapPost";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebaseClient";
import { collection, orderBy, query, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

const fetchDataContext = createContext();

export function FetchDataContextWrapper({ children }) {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const allPostsData = async () => {
        const ref = collection(db, "subjectPosts",);
        const newQuery = query(
            ref, orderBy("timestamp", "desc"),
        );
        const selectedCategoryData = query(
            ref, orderBy("timestamp", "desc"),
            where("category", "==", selectedCategory),

        );
        const unsubscribe = onSnapshot(
            selectedCategory === "" ? newQuery : selectedCategoryData,
            (snap) => {
                let postList = [];
                snap.docs.map((e) => {
                    postList.push(MapPost({ ...e.data(), id: e.id }));
                });
                setData(postList);
            }
        );
        return unsubscribe;
    };

    useEffect(() => {
        allPostsData();
    }, [selectedCategory]);

    return (
        <fetchDataContext.Provider value={{ data, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }}>
            {children}
        </fetchDataContext.Provider>
    );
}

export const useFetchData = () => useContext(fetchDataContext);
