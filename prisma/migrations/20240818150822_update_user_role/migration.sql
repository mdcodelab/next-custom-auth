-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailToken" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "hashedPassword" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "hashedPassword", "id", "name", "role") SELECT "email", "hashedPassword", "id", "name", coalesce("role", 'user') AS "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
