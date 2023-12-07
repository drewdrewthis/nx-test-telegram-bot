-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "telegramUserId" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "isBot" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "languageCode" TEXT,
    "isPremium" BOOLEAN,
    "addedToAttachmentMenu" BOOLEAN,
    "canJoinGroups" BOOLEAN,
    "canReadAllGroupMessages" BOOLEAN,
    "supportsInlineQueries" BOOLEAN,

    CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
