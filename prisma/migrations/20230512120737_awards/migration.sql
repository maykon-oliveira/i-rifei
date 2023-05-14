/*
  Warnings:

  - You are about to drop the `RaffleSold` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `drawDay` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Raffle` table. All the data in the column will be lost.
  - Added the required column `drawDate` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerId` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RaffleSold";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RaffleAward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "raffleId" TEXT NOT NULL,
    CONSTRAINT "RaffleAward_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "raffleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Ticket_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "Raffle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Raffle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "drawDate" DATETIME NOT NULL,
    "drawn" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Raffle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Raffle_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Raffle" ("createdAt", "description", "drawn", "id", "price", "size", "updatedAt") SELECT "createdAt", "description", "drawn", "id", "price", "size", "updatedAt" FROM "Raffle";
DROP TABLE "Raffle";
ALTER TABLE "new_Raffle" RENAME TO "Raffle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
