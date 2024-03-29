import { relations } from "drizzle-orm";
import {
  pgTable,
  bigint,
  varchar,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  // other user attributes
  username: varchar("username", {
    length: 255,
  })
    .unique()
    .notNull(),
  avatar: varchar("avatar", { length: 255 }),
});

export const userRelations = relations(user, ({ many }) => ({
  decks: many(decks),
}));

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const decks = pgTable(
  "decks",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 15 })
      .notNull()
      .references(() => user.id),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    public: boolean("public").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow(),
    lastUpdate: timestamp("last_update").defaultNow(),
  },
  (table) => {
    return {
      titleIndex: index("title_index").on(table.title),
      isPublicIndex: index("is_public_index").on(table.public),
    };
  }
);

export const decksRelations = relations(decks, ({ many, one }) => ({
  tags: many(deckTags),
  flashcards: many(flashcards),
  user: one(user, {
    fields: [decks.userId],
    references: [user.id],
  }),
}));

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id")
    .notNull()
    .references(() => decks.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  learned: boolean("learned").default(false),
});

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  deck: one(decks, {
    fields: [flashcards.deckId],
    references: [decks.id],
  }),
}));

export const deckProgress = pgTable("deck_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  deckId: integer("deck_id")
    .notNull()
    .references(() => decks.id),
  currentFlashCardId: integer("current_flashcard_id")
    .notNull()
    .references(() => flashcards.id),
  completed: boolean("completed"),
});

// export const userFlashcardInteraction = pgTable('user_flashcard_interaction', {
// 	id: serial('id').primaryKey(),
// 	userId: varchar('user_id', {length: 15}).notNull().references(() => user.id),
// 	flashcardId: integer('current_flashcard_id').notNull().references(() => flashcards.id),
// 	interactionDate: timestamp('interaction_date').defaultNow(),
// 	correct: boolean('correct')
// })

export const deckTags = pgTable("deck_tags", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").references(() => decks.id),
  tagName: varchar("tag_name", { length: 50 }).notNull(),
});

export const deckTagsRelations = relations(deckTags, ({ one }) => ({
  deck: one(decks, {
    fields: [deckTags.deckId],
    references: [decks.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type Key = typeof key.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Deck = typeof decks.$inferSelect;
export type Flashcard = typeof flashcards.$inferSelect;
// export type UserFlashcardInteraction = typeof userFlashcardInteraction.$inferSelect;
export type DeckTags = typeof deckTags.$inferSelect;
