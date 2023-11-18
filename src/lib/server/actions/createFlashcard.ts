import { dbHttp } from "../db"
import { flashcards } from "../db/schema"

type Flashcard = {
    question: string,
    answer: string
}

export const createFlashcard = async (deckId: number, flashcardData: Flashcard | Flashcard[]) => {
    if(Array.isArray(flashcardData)) {
        const data = flashcardData.map(flashcard => ({deckId, ...flashcard}))
        await dbHttp.insert(flashcards).values(data)
    } else {
        await dbHttp.insert(flashcards).values({deckId, ...flashcardData})
    }
}