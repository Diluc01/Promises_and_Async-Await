import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const returnedValue = await central(id);
  console.log(returnedValue);
  const dbPromise = new Promise((resolve, reject) => {
    try {
      let dbResult = dbs[returnedValue](id);
      resolve(dbResult);
    } catch (err) {
      reject(err);
    }
  });
  const dbVault = new Promise((resolve, reject) => {
    try {
      let vaultResult = vault(id);
      resolve(vaultResult);
    } catch (err) {
      reject(err);
    }
  });

  return new Promise((resolve, reject) => {
    Promise.all([dbPromise, dbVault]).then(([dbResult, vaultResult]) => {
      resolve({ ...dbResult, ...vaultResult });
    });
  });
}

const result = getUserData(1);
result.then((resultData) => console.log(resultData));
console.log("This is the result:");
console.log(result);
