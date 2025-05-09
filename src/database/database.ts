import db from "./db";
import { Profile } from "./models/Profile";

const createTable = (): void => {
  const query = `
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      domains TEXT NOT NULL
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

const addProfile = (name: string, domains: string[]): void => {
  const domainsStr = domains.join(", ");
  const query = `INSERT INTO profiles (name, domains) VALUES (?, ?)`;

  db.run(query, [name, domainsStr], function (err) {
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

const updateProfile = (id: number, name: string, domains: string[]): void => {
  const domainsStr = domains.join(", ");
  const query = `UPDATE profiles SET name = ?, domains = ? WHERE id = ?`;
  db.run(query, [name, domainsStr, id], function (err) {
    if (err) {
      console.error("Error updating profile", err.message);
    } else {
      console.log(`Profile with ID: ${id} updated.`);
    }
  });
};

createTable();

export { addProfile, getProfiles, deleteProfile, updateProfile };
