-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "creado_en" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Persona" ("apellido_materno", "apellido_paterno", "creado_en", "direccion", "id", "nombre", "telefono") SELECT "apellido_materno", "apellido_paterno", "creado_en", "direccion", "id", "nombre", "telefono" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
CREATE UNIQUE INDEX "Persona_telefono_key" ON "Persona"("telefono");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
