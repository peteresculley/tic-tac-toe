import { Pool } from 'pg';

function createPool(): Pool {
    return new Pool({
        connectionString: process.env.DATABASE_URL
        // user: process.env.DB_USER || '',
        // password: process.env.DB_PASSWORD || '',
        // database: process.env.DB_DATABASE || '',
        // host: process.env.DB_HOST || 'localhost',
        // port: parseInt(process.env.DB_PORT || '5432', 10),
    });
}

function createTable(pool: Pool, table: string): void {
    pool.query(`
        CREATE TABLE ${table}(
        id BIGSERIAL PRIMARY KEY,
        winner INTEGER,
        moves TEXT)
    `).catch(() => ({}));
}

export class Dao {
    private pool: Pool;
    private table: string;

    constructor() {
        this.pool = createPool();
        this.table = process.env.DB_TABLE || 'tictactoe';

        createTable(this.pool, this.table);
    }

    protected async openDb(): Promise<any> {
        return this.pool.query(`SELECT * FROM ${this.table}`).then((value) => value.rows);
    }

    protected async addEntry(entry: any): Promise<any> {
        const keyValuePairs = Object.entries(entry);
        const keys = keyValuePairs.map((pair: [string, any]) => pair[0]);
        const values = keyValuePairs.map((pair: [string, any]) => pair[1]);
        const valuesAs$IncIntegers = values.map((value, index) => `$${index + 1}`);
        return this.pool.query(`
            INSERT INTO ${this.table}(${keys.join(', ')})
            VALUES(${valuesAs$IncIntegers})`, values);
    }
}
