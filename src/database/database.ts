import db from "./db";
import { Profile } from "./models/Profile";

const createTable = (): void => {
  const query = `
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      subdomains TEXT NOT NULL
    );
  `;
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating table", err.message);
    } else {
      console.log("Profiles table is ready.");
    }
  });
};

const addProfile = (name: string, subdomains: string[]): void => {
  const subdomainsStr = subdomains.join(", ");
  const query = `INSERT INTO profiles (name, subdomains) VALUES (?, ?)`;

  db.run(query, [name, subdomainsStr], function (err) {
    if (err) {
      console.error("Error adding profile", err.message);
    } else {
      console.log(`Profile added with ID: ${this.lastID}`);
    }
  });
};

const getProfiles = (
  callback: (err: Error | null, rows: Profile[]) => void
): void => {
  const query = "SELECT * FROM profiles";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error getting profiles", err.message);
      callback(err, []);
    } else {
      callback(null, rows as Profile[]);
    }
  });
};

const deleteProfile = (id: number): void => {
  const query = `DELETE FROM profiles WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error("Error deleting profile", err.message);
    } else {
      console.log(`Profile with ID: ${id} deleted.`);
    }
  });
};

createTable();

export { addProfile, getProfiles, deleteProfile };
