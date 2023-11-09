import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey()
	// other user attributes
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

export const note = pgTable('note', {
    id: varchar('id', {
        length: 255
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15
    }).notNull().references(() => user.id),
    title: varchar('title', {
        length: 255
    }).notNull(),
    content: varchar('content', {
        length: 255
    }).notNull()
})

export type User = typeof user.$inferSelect;
export type Note = typeof note.$inferSelect;
export type Key = typeof key.$inferSelect;
export type Session = typeof session.$inferSelect;