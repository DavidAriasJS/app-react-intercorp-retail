import { addDoc, collection, getDocs } from "firebase/firestore";
import { IClient } from "../interfaces";
import dbFirestore from "./firestore";

const collectionFirestore = 'clients';

export const registerClient = async (client: IClient) => {
    try {
        const docRef = await addDoc(collection(dbFirestore, collectionFirestore), client);
        const respClient = { ...client, id: docRef.id as string };
        return respClient;
    } catch (e) {
        console.error("Error: ", e);
    }
}

export const getClients = async () => {
    const querySnapshot = await getDocs(collection(dbFirestore, collectionFirestore));
    
    let lists: IClient[] = [];

    querySnapshot.forEach((doc) => {
        const dataDoc = doc.data() as IClient;
        lists = [...lists, dataDoc];
    });

    return lists;
}

