import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = (content) => {
  openDB('jate', 1).then(data => {
    data.transaction('jate', 'readwrite').objectStore('jate').put({ id: 1, content })
  })
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = () => {
  return new Promise(async (res, rej) => {
    openDB('jate', 1).then(jateDb => {
      jateDb.transaction('jate', 'readonly').objectStore('jate').get(1).then(result => res(result?.value));
    });
  });
};

initdb();
