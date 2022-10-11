import { addDoc, collection } from "firebase/firestore";
import { IClient } from "../interfaces";
import dbFirestore from "./firestore";

const collectionFirestore = 'clients';

export const registerClient = async (clientData : IClient)  => {
    try {
        const docRef = await addDoc(collection(dbFirestore, collectionFirestore), clientData);
        
        console.log('LLEGO AQUI');

        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

