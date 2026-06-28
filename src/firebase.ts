import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Use default database if firestoreDatabaseId is "(default)" or missing
const databaseId = (firebaseConfig as any).firestoreDatabaseId;
export const db = (databaseId && databaseId !== '(default)') 
  ? getFirestore(app, databaseId) 
  : getFirestore(app);

// Initialize Analytics safely
let analyticsInstance = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analyticsInstance = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics failed to initialize (likely blocked by ad-blocker):", err);
  }
}
export const analytics = analyticsInstance;
export const googleProvider = new GoogleAuthProvider();
export { serverTimestamp };

// Validate Connection to Firestore with improved error reporting
async function testConnection() {
  if (typeof window === 'undefined') return;
  
  try {
    // Try to get a non-existent document with a short timeout hint
    // We use a safe try-catch to avoid crashing the entry point
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
    console.log("Firestore connection verified.");
  } catch (error: any) {
    // Silent fail for expected connectivity issues during init
    if (error?.code === 'unavailable' || error?.message?.includes('Could not reach')) {
      console.info("Firestore is currently in offline mode or unavailable. The app will continue to function using local state where possible.");
    }
  }
}
testConnection();

// Error Handling Spec for Firestore Operations
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
