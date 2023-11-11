import { pgTable, bigint, varchar, text, timestamp, boolean, PgChar, primaryKey } from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar("username", {
		length: 255
	}).unique().notNull(),
});

export const session = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const key = pgTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const decks = pgTable('decks', {
	id: varchar('id', {length: 255}).primaryKey(),
	userId: varchar('user_id', {length: 15}).notNull().references(() => user.id),
	title: varchar('title', {length: 100}).notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	lastUpdate: timestamp('last_update').defaultNow()
})

export const flashcards = pgTable('flashcards', {
	id: varchar('id', {length: 255}).primaryKey(),
	deckId: varchar('deck_id', {length: 255}).notNull().references(() => decks.id),
	question: text('question').notNull(),
	answer: text('answer').notNull()
})

export const deckProgress = pgTable('deck_progress', {
	id: varchar('id', {length: 255}).primaryKey(),
	userId: varchar('user_id', {length: 15}).notNull().references(() => user.id),
	deckId: varchar('deck_id', {length: 255}).notNull().references(() => decks.id),
	currentFlashCardId: varchar('current_flashcard_id', {length: 255}).notNull().references(() => flashcards.id),
	completed: boolean('completed')
})

export const userFlashcardInteraction = pgTable('user_flashcard_interaction', {
	id: varchar('id', {length: 255}).primaryKey(),
	userId: varchar('user_id', {length: 15}).notNull().references(() => user.id),
	flashcardId: varchar('current_flashcard_id', {length: 255}).notNull().references(() => flashcards.id),
	interactionDate: timestamp('interaction_date').defaultNow(),
	correct: boolean('correct')

})

export const tags = pgTable('tags', {
	id: varchar('id', {length: 15}).primaryKey(),
	tag_name: varchar('tag_name', {length: 50}).notNull()
})

export const deckTags = pgTable('deck_tags', {
	deckId: varchar('deck_id', {length: 255}).notNull().references(() => decks.id),
	tagId: varchar('id', {length: 15}).references(() => tags.id)
}, (table) => ({
	pk: primaryKey({columns: [table.deckId, table.tagId]})
}))

export type User = typeof user.$inferSelect;
export type Key = typeof key.$inferSelect;
export type Session = typeof session.$inferSelect;