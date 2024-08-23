import firestore from '@react-native-firebase/firestore';

export const useUserFireStore = () => {
    const getUsers = async () => {
    try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
    };

    const getUserById = async (userId) => {
    try {
        const userSnapshot = await firestore().collection('Users').doc(userId).get();
        if (userSnapshot.exists) {
        return {
            id: userSnapshot.id,
            ...userSnapshot.data(),
        };
        } else {
        throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
    };
}   

export const useUserFireStore = () => {
    const getUsers = async () => {
    try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
    };

    const getUserById = async (userId) => {
    try {
        const userSnapshot = await firestore().collection('Users').doc(userId).get();
        if (userSnapshot.exists) {
        return {
            id: userSnapshot.id,
            ...userSnapshot.data(),
        };
        } else {
        throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
    };
}   