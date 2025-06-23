-- AlterTable
CREATE SEQUENCE book_bookid_seq;
ALTER TABLE "Book" ALTER COLUMN "bookId" SET DEFAULT nextval('book_bookid_seq');
ALTER SEQUENCE book_bookid_seq OWNED BY "Book"."bookId";

-- AlterTable
CREATE SEQUENCE copy_copyid_seq;
ALTER TABLE "Copy" ALTER COLUMN "copyId" SET DEFAULT nextval('copy_copyid_seq');
ALTER SEQUENCE copy_copyid_seq OWNED BY "Copy"."copyId";

-- AlterTable
CREATE SEQUENCE sanction_sanctionid_seq;
ALTER TABLE "Sanction" ALTER COLUMN "sanctionId" SET DEFAULT nextval('sanction_sanctionid_seq');
ALTER SEQUENCE sanction_sanctionid_seq OWNED BY "Sanction"."sanctionId";

-- AlterTable
CREATE SEQUENCE sanctionpolicy_idsanctionpolicy_seq;
ALTER TABLE "SanctionPolicy" ALTER COLUMN "idSanctionPolicy" SET DEFAULT nextval('sanctionpolicy_idsanctionpolicy_seq');
ALTER SEQUENCE sanctionpolicy_idsanctionpolicy_seq OWNED BY "SanctionPolicy"."idSanctionPolicy";
