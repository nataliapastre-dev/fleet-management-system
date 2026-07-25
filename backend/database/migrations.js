import db from "./database.js";

// Tabela de veículos
db.exec(`
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    fuel TEXT NOT NULL,
    status TEXT NOT NULL
);
`);

// Tabela de Ordens de Serviço
db.exec(`
CREATE TABLE IF NOT EXISTS service_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,

    opening_date TEXT NOT NULL,
    closing_date TEXT,

    mileage INTEGER NOT NULL,

    workshop TEXT NOT NULL,

    type TEXT NOT NULL,

    description TEXT,

    status TEXT NOT NULL,

    total_cost REAL DEFAULT 0,

    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
`);

console.log("✅ Banco de dados inicializado.");