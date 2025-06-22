/*
  Warnings:

  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Copies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SanctionPolicies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sanctions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Copies" DROP CONSTRAINT "bookId";

-- DropForeignKey
ALTER TABLE "LoanDetails" DROP CONSTRAINT "LoanDetails_loanId_fkey";

-- DropForeignKey
ALTER TABLE "Loans" DROP CONSTRAINT "member";

-- DropForeignKey
ALTER TABLE "Sanctions" DROP CONSTRAINT "member";

-- DropTable
DROP TABLE "Books";

-- DropTable
DROP TABLE "Copies";

-- DropTable
DROP TABLE "LoanDetails";

-- DropTable
DROP TABLE "Loans";

-- DropTable
DROP TABLE "Members";

-- DropTable
DROP TABLE "SanctionPolicies";

-- DropTable
DROP TABLE "Sanctions";

-- CreateTable
CREATE TABLE "Book" (
    "bookId" INTEGER NOT NULL,
    "isbn" VARCHAR(13) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "editionNumber" VARCHAR(4) NOT NULL,
    "editionDate" TIMESTAMPTZ(6) NOT NULL,
    "maxLoanDays" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "Copy" (
    "copyId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Copy_pkey" PRIMARY KEY ("copyId")
);

-- CreateTable
CREATE TABLE "LoanDetail" (
    "loanId" INTEGER NOT NULL,
    "detailNumber" INTEGER NOT NULL,
    "theoreticalReturnDate" TIMESTAMPTZ(6) NOT NULL,
    "actualReturnDate" TIMESTAMPTZ(6),
    "loanLineStatus" "loanlinestatus_enum" NOT NULL,

    CONSTRAINT "LoanDetail_pkey" PRIMARY KEY ("loanId","detailNumber")
);

-- CreateTable
CREATE TABLE "Loan" (
    "loanId" SERIAL NOT NULL,
    "loanDate" TIMESTAMPTZ(6) NOT NULL,
    "memberId" UUID NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("loanId")
);

-- CreateTable
CREATE TABLE "Member" (
    "memberId" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "memberStatus" "memberstatus_enum" NOT NULL DEFAULT 'Enabled',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "SanctionPolicy" (
    "idSanctionPolicy" INTEGER NOT NULL,
    "daysLateFrom" INTEGER NOT NULL,
    "daysLateTo" INTEGER NOT NULL,
    "sanctionDays" INTEGER NOT NULL,

    CONSTRAINT "SanctionPolicy_pkey" PRIMARY KEY ("idSanctionPolicy")
);

-- CreateTable
CREATE TABLE "Sanction" (
    "sanctionId" INTEGER NOT NULL,
    "sanctionDate" TIMESTAMPTZ(6) NOT NULL,
    "sanctionDays" INTEGER NOT NULL,
    "memberId" UUID NOT NULL,

    CONSTRAINT "Sanction_pkey" PRIMARY KEY ("sanctionId")
);

-- CreateIndex
CREATE INDEX "Copy_bookId_idx" ON "Copy"("bookId");

-- CreateIndex
CREATE INDEX "LoanDetail_loanId_idx" ON "LoanDetail"("loanId");

-- CreateIndex
CREATE INDEX "Loan_memberId_idx" ON "Loan"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "uniqueEmail" ON "Member"("email");

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "bookId" FOREIGN KEY ("bookId") REFERENCES "Book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanDetail" ADD CONSTRAINT "LoanDetail_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("loanId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "member" FOREIGN KEY ("memberId") REFERENCES "Member"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanction" ADD CONSTRAINT "member" FOREIGN KEY ("memberId") REFERENCES "Member"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;
