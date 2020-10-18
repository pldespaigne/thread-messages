
import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

// import { OkiniriAdmin } from '@okiniri/sdk'; // TODO : uncomment to enable okiniri



interface ErrorResultResponse { error?: string, result: any };

interface CreateUserParams {name: string, password: string, isSeller: boolean};

interface UserModel {
  password: string,
  isSeller: boolean,
  okiniri: {
    id: string,
    sellerId?: string;
  }
};

export const createUser = https.onCall(async(data: CreateUserParams): Promise<ErrorResultResponse> => {

  // --------------------------
  //        INIT OKINIRI
  // --------------------------
  // TODO : uncomment to enable okiniri
  // const appId = config().okiniri.app_id;
  // const secret = config().okiniri.secret;

  // if (!appId) {
  //   console.error(`$$$ : MISSING CONFIG VALUE FOR 'okiniri.app_id'`);
  //   return { error: 'INTERNAL_SERVER_ERROR', result: `Missing config value` };
  // }
  // if (!secret) {
  //   console.error(`$$$ : MISSING CONFIG VALUE FOR 'okiniri.secret'`);
  //   return { error: 'INTERNAL_SERVER_ERROR', result: `Missing config value` };
  // }
  // const okiniriAdmin = new OkiniriAdmin(appId, secret);

  // --------------------------
  //      CHECKING INPUTS
  // --------------------------

  if (!data.name) return { error: 'MISSING_PARAM', result: `Parameter 'name' is mandatory, but was missing!` };
  if (!data.password) return { error: 'MISSING_PARAM', result: `Parameter 'password' is mandatory, but was missing!` };
  if (data.isSeller === undefined || data.isSeller === null) return { error: 'MISSING_PARAM', result: `Parameter 'isSeller' is mandatory, but was missing!` };


  // --------------------------
  //      FUNCTIONS LOGIC
  // --------------------------

  const app = initializeApp();
  const db = app.firestore();

  const userRef = db.doc(`users/${data.name}`);
  const userSnap = await userRef.get();

  if (userSnap.exists)  return { error: 'USERNAME_TAKEN', result: `The username '${data.name}' is already taken!` };


  // const okiniriUser = await okiniriAdmin.upsertUser(); // TODO : uncomment to enable okiniri

  const newUser: UserModel = {
    password: data.password,
    isSeller: data.isSeller,
    okiniri: {
      id: '',
      // id: okiniriUser.id,
    }
  };

  // TODO : uncomment to enable okiniri
  // if (data.isSeller) {
    // const sellerObject = await okiniriAdmin.createObject('seller', okiniriUser.id);
    // newUser.okiniri.sellerId = sellerObject.id;
  // }

  await userRef.set(newUser);

  return {
    result: newUser,
  };

});
