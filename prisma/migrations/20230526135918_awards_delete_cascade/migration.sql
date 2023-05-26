-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RaffleAward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "raffleId" TEXT NOT NULL,
    CONSTRAINT "RaffleAward_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RaffleAward" ("id", "name", "raffleId") SELECT "id", "name", "raffleId" FROM "RaffleAward";
DROP TABLE "RaffleAward";
ALTER TABLE "new_RaffleAward" RENAME TO "RaffleAward";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
