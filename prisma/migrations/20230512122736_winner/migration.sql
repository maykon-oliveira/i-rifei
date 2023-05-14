-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Raffle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "size" INTEGER NOT NULL,
    "drawDate" DATETIME NOT NULL,
    "drawn" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "winnerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Raffle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Raffle_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Raffle" ("createdAt", "description", "drawDate", "drawn", "id", "ownerId", "price", "size", "title", "updatedAt", "winnerId") SELECT "createdAt", "description", "drawDate", "drawn", "id", "ownerId", "price", "size", "title", "updatedAt", "winnerId" FROM "Raffle";
DROP TABLE "Raffle";
ALTER TABLE "new_Raffle" RENAME TO "Raffle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
