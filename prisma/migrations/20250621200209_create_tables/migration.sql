-- CreateEnum
CREATE TYPE "loanlinestatus_enum" AS ENUM ('Pending', 'Returned');

-- CreateEnum
CREATE TYPE "memberstatus_enum" AS ENUM ('Enabled', 'Disabled', 'Sanctioned');

-- CreateTable
CREATE TABLE "Books" (
    "bookId" INTEGER NOT NULL,
    "isbn" VARCHAR(13) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "editionNumber" VARCHAR(4) NOT NULL,
    "editionDate" TIMESTAMPTZ(6) NOT NULL,
    "maxLoanDays" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "Copies" (
    "copyId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Copies_pkey" PRIMARY KEY ("copyId")
);

-- CreateTable
CREATE TABLE "LoanDetails" (
    "loanId" INTEGER NOT NULL,
    "detailNumber" INTEGER NOT NULL,
    "theoreticalReturnDate" TIMESTAMPTZ(6) NOT NULL,
    "actualReturnDate" TIMESTAMPTZ(6),
    "loanLineStatus" "loanlinestatus_enum" NOT NULL,

    CONSTRAINT "LoanDetails_pkey" PRIMARY KEY ("loanId","detailNumber")
);

-- CreateTable
CREATE TABLE "LoanPolicy" (
    "maxPendingBooks" INTEGER NOT NULL,

    CONSTRAINT "LoanPolicy_pkey" PRIMARY KEY ("maxPendingBooks")
);

-- CreateTable
CREATE TABLE "Loans" (
    "loanId" SERIAL NOT NULL,
    "loanDate" TIMESTAMPTZ(6) NOT NULL,
    "memberId" UUID NOT NULL,

    CONSTRAINT "Loans_pkey" PRIMARY KEY ("loanId")
);

-- CreateTable
CREATE TABLE "Members" (
    "memberId" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "memberStatus" "memberstatus_enum" NOT NULL DEFAULT 'Enabled',

    CONSTRAINT "Members_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "SanctionPolicies" (
    "idSanctionPolicy" INTEGER NOT NULL,
    "daysLateFrom" INTEGER NOT NULL,
    "daysLateTo" INTEGER NOT NULL,
    "sanctionDays" INTEGER NOT NULL,

    CONSTRAINT "SanctionPolicies_pkey" PRIMARY KEY ("idSanctionPolicy")
);

-- CreateTable
CREATE TABLE "Sanctions" (
    "sanctionId" INTEGER NOT NULL,
    "sanctionDate" TIMESTAMPTZ(6) NOT NULL,
    "sanctionDays" INTEGER NOT NULL,
    "memberId" UUID NOT NULL,

    CONSTRAINT "Sanctions_pkey" PRIMARY KEY ("sanctionId")
);

-- CreateIndex
CREATE INDEX "Copies_bookId_idx" ON "Copies"("bookId");

-- CreateIndex
CREATE INDEX "LoanDetails_loanId_idx" ON "LoanDetails"("loanId");

-- CreateIndex
CREATE INDEX "Loans_memberId_idx" ON "Loans"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "uniqueEmail" ON "Members"("email");

-- AddForeignKey
ALTER TABLE "Copies" ADD CONSTRAINT "bookId" FOREIGN KEY ("bookId") REFERENCES "Books"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanDetails" ADD CONSTRAINT "LoanDetails_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loans"("loanId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loans" ADD CONSTRAINT "member" FOREIGN KEY ("memberId") REFERENCES "Members"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanctions" ADD CONSTRAINT "member" FOREIGN KEY ("memberId") REFERENCES "Members"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;
