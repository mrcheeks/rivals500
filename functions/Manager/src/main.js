import { Account, Client, ID, TablesDB, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const users = new Users(client);
  const tablesDB = new TablesDB(client);
  const account = new Account(client);

  if (!req.body.data.action) {
      return res.json({ error: "Missing 'action' parameter" }, 400);
  } else {
    if (req.body.data.action === "createUser") {

      //CREATE USER
      const promise = account.create(
        ID.unique(), 
        !req.body.data.email, 
        !req.body.data.password
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "login") {

      //LOGIN USER
      const promise = account.createEmailPasswordSession(
        !req.body.data.email, 
        !req.body.data.password
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "delete") {

      //DELETE USER SESSION
      const promise = account.deleteSession(req.body.data.sessionId);

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "createGame") {

      //CREATE GAME
      const promise = tablesDB.createRow(
        process.env.APPWRITE_DATABASE_ID, 
        process.env.APPWRITE_GAMES_COLLECTION_ID, 
        ID.unique(), 
        req.body.data.gameData
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "deleteGame") {

      //DELETE GAME
      const promise = tablesDB.deleteRow(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_GAMES_COLLECTION_ID,
        req.body.data.gameId
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });

    } else if (req.body.data.action === "createTeam") {

      //CREATE TEAM
      const promise = tablesDB.createRow(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TEAMS_COLLECTION_ID,
        ID.unique(),
        req.body.data.teamData
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "deleteTeam") {

      //DELETE TEAM
      const promise = tablesDB.deleteRow(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TEAMS_COLLECTION_ID,
        req.body.data.teamId
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "createContract") {

      //CREATE CONTRACT
      const promise = tablesDB.createRow(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_CONTRACTS_COLLECTION_ID,
        ID.unique(),
        req.body.data.contractData
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "updateContract") {

      //UPDATE CONTRACT
      const promise = tablesDB.updateRow(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_CONTRACTS_COLLECTION_ID,
        req.body.data.contractId,
        req.body.data.contractData
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    } else if (req.body.data.action === "listContracts") {

      //LIST CONTRACTS
      const promise = tablesDB.listRows(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_CONTRACTS_COLLECTION_ID,
        [
          Query.equal('game', req.body.data.gameId)
        ]
      );

      promise.then(function (response) {
          return res.json(response);
      }, function (error) {
          return res.json({ error: error.message }, 500);
      });
    }
  }
};
