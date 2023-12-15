import { auth } from "../lucia";
import { deleteDeck } from "./deleteDeck"
import { getUserDecks } from "./getUserDecks"

export const deleteUser = async (userId: string) => {
    const userDecks = await getUserDecks(userId);
    if(!userDecks) {
        await auth.deleteUser(userId);
        return { success: true };
    };

    let decksPromisesArray: Promise<any>[] = [];
    for(const userDeck of userDecks) {
        decksPromisesArray.push(deleteDeck(userDeck.id, userId));
    }

    const promisesResults = await Promise.all(decksPromisesArray);

    if(promisesResults.every(result => result.success)){
        await auth.deleteUser(userId);
        return { success: true };
    }

    return { success: false, message: "Something went wrong" };

}