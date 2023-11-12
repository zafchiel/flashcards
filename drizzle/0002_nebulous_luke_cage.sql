/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'deck_tags'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "deck_tags" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "deck_tags" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "deck_tags" ALTER COLUMN "deck_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "avatar" SET DEFAULT 'https://api.dicebear.com/7.x/thumbs/svg?seed=0.36484049975374444&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4';