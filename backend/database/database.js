import Database from "better-sqlite3";
import bcrypt from "bcrypt";

const db = new Database("fleet.db");


// =====================================
// TABELA DE VEÍCULOS
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT NOT NULL,
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INTEGER,
    chassis TEXT,
    color TEXT,
    renavam TEXT,
    fuel TEXT,
    transmission TEXT,
    mileage INTEGER,
    category TEXT,
    purchase_date TEXT,
    purchase_value REAL,
    document_expiration TEXT,
    next_revision TEXT,
    next_oil_change TEXT,
    insurance_expiration TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Disponível',
    driver_id INTEGER,
    FOREIGN KEY(driver_id) REFERENCES drivers(id)
)
`).run();



const vehicleColumns = [
    "chassis TEXT",
    "color TEXT",
    "renavam TEXT",
    "fuel TEXT",
    "transmission TEXT",
    "mileage INTEGER",
    "category TEXT",
    "purchase_date TEXT",
    "purchase_value REAL",
    "document_expiration TEXT",
    "next_revision TEXT",
    "next_oil_change TEXT",
    "insurance_expiration TEXT",
    "notes TEXT",
    "driver_id INTEGER"
];


vehicleColumns.forEach(column => {

    try {

        db.prepare(
            `ALTER TABLE vehicles ADD COLUMN ${column}`
        ).run();

    } catch {}

});



db.prepare(`
CREATE INDEX IF NOT EXISTS idx_vehicle_driver
ON vehicles(driver_id)
`).run();




// =====================================
// MOTORISTAS
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS drivers (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    cpf TEXT UNIQUE NOT NULL,

    cnh TEXT NOT NULL,

    category TEXT NOT NULL,

    expiration_date TEXT NOT NULL,

    phone TEXT,

    email TEXT,

    status TEXT DEFAULT 'Ativo'

)
`).run();




// =====================================
// ORDENS DE SERVIÇO
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS service_orders (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,

    service_date TEXT NOT NULL,

    km_vehicle INTEGER DEFAULT 0,

    description TEXT NOT NULL,

    service_type TEXT DEFAULT 'Preventiva',

    maintenance_type TEXT DEFAULT 'Corretiva',

    mechanic TEXT,

    status TEXT DEFAULT 'Aberta',

    cost REAL DEFAULT 0,

    parts_cost REAL DEFAULT 0,

    labor_cost REAL DEFAULT 0,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)

)
`).run();



db.prepare(`
CREATE INDEX IF NOT EXISTS idx_service_vehicle
ON service_orders(vehicle_id)
`).run();




// =====================================
// CONTRATOS
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS contracts (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,

    contract_number TEXT NOT NULL,

    supplier TEXT NOT NULL,

    start_date TEXT NOT NULL,

    end_date TEXT NOT NULL,

    monthly_value REAL NOT NULL,

    status TEXT DEFAULT 'Ativo',

    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)

)
`).run();



db.prepare(`
CREATE INDEX IF NOT EXISTS idx_contract_vehicle
ON contracts(vehicle_id)
`).run();




// =====================================
// MANUTENÇÕES
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS maintenance (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,

    service_order_id INTEGER,

    maintenance_type TEXT NOT NULL,

    description TEXT NOT NULL,

    mechanic TEXT,

    workshop TEXT,

    workshop_address TEXT,

    workshop_city TEXT,

    workshop_phone TEXT,

    workshop_email TEXT,

    maintenance_date TEXT NOT NULL,

    km_vehicle INTEGER DEFAULT 0,

    parts_cost REAL DEFAULT 0,

    labor_cost REAL DEFAULT 0,

    total_cost REAL DEFAULT 0,

    status TEXT DEFAULT 'Aberta',

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),

    FOREIGN KEY(service_order_id) REFERENCES service_orders(id)

)
`).run();



db.prepare(`
CREATE INDEX IF NOT EXISTS idx_maintenance_vehicle
ON maintenance(vehicle_id)
`).run();




// =====================================
// USUÁRIOS LOGIN
// =====================================

db.prepare(`
CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    role TEXT DEFAULT 'Administrador',

    status TEXT DEFAULT 'Ativo',

    last_login TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT DEFAULT CURRENT_TIMESTAMP

)
`).run();





db.prepare(`
CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email)
`).run();




db.prepare(`
CREATE INDEX IF NOT EXISTS idx_users_status
ON users(status)
`).run();




// =====================================
// CRIAR ADMIN PADRÃO
// =====================================

const admin = db
.prepare(`
SELECT *
FROM users
WHERE email = ?
`)
.get("admin@fleet.com");



if(!admin){

    const passwordHash = await bcrypt.hash(
        "123456",
        10
    );


    db.prepare(`
    INSERT INTO users
    (
        name,
        email,
        password,
        role,
        status
    )
    VALUES
    (?, ?, ?, ?, ?)

    `)
    .run(
        "Administrador",
        "admin@fleet.com",
        passwordHash,
        "Administrador",
        "Ativo"
    );


    console.log("✅ Usuário administrador criado");
    console.log("📧 Email: admin@fleet.com");
    console.log("🔑 Senha: 123456");

}




// =====================================
// EXPORTAÇÃO
// =====================================

export default db;