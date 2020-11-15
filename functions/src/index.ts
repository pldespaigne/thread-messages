
import { config, https } from 'firebase-functions';
import { app, initializeApp } from 'firebase-admin';

import { OkiniriAdmin } from '@okiniri/sdk'; // TODO : uncomment to enable okiniri



interface ErrorResultResponse { error?: string, result: any };

interface CreateUserParams { name: string, password: string };

interface UserModel {
  password: string,
  okiniri: {
    id: string,
    secret: string,
  }
};

let _app: app.App;
let _db: FirebaseFirestore.Firestore;

function firebaseLazyInit() {
  if (!_app) {
    _app = initializeApp();
  }
  return _app;
}
function firestoreLazyInit() {
  if (!_db) {
    const firebase = firebaseLazyInit();
    _db = firebase.firestore();
  }
  return _db;
}

export const createUser = https.onCall(async(data: CreateUserParams): Promise<ErrorResultResponse> => {

  // --------------------------
  //        INIT OKINIRI
  // --------------------------

  const appId = config().okiniri.app_id;
  const secret = config().okiniri.secret;

  if (!appId) {
    console.error(`$$$ : MISSING CONFIG VALUE FOR 'okiniri.app_id'`);
    return { error: 'INTERNAL_SERVER_ERROR', result: `Missing config value` };
  }
  if (!secret) {
    console.error(`$$$ : MISSING CONFIG VALUE FOR 'okiniri.secret'`);
    return { error: 'INTERNAL_SERVER_ERROR', result: `Missing config value` };
  }
  const okiniriAdmin = new OkiniriAdmin(appId, secret);

  // --------------------------
  //      CHECKING INPUTS
  // --------------------------

  if (!data.name) return { error: 'MISSING_PARAM', result: `Parameter 'name' is mandatory, but was missing!` };
  if (!data.password) return { error: 'MISSING_PARAM', result: `Parameter 'password' is mandatory, but was missing!` };

  // --------------------------
  //      FUNCTIONS LOGIC
  // --------------------------

  const db = firestoreLazyInit();

  const userRef = db.doc(`users/${data.name}`);
  const userSnap = await userRef.get();

  if (userSnap.exists)  return { error: 'USERNAME_TAKEN', result: `The username '${data.name}' is already taken!` };


  const okiniriUser = await okiniriAdmin.upsertUser();

  const newUser: UserModel = {
    password: data.password,
    okiniri: {
      id: okiniriUser.id,
      secret: okiniriUser.secret,
    }
  };

  await userRef.set(newUser);

  return {
    result: newUser,
  };

});
