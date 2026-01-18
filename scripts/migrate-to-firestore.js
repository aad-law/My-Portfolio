/**
 * Simplified Migration Script: Portfolio JSON to Firestore
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Clean function: replace # with empty string, remove null/undefined
function clean(obj) {
  if (Array.isArray(obj)) {
    return obj.filter(v => v != null).map(clean);
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value != null) {
        if (typeof value === 'string' && value === '#') {
          result[key] = '';
        } else {
          result[key] = clean(value);
        }
      }
    }
    return result;
  }
  return obj === '#' ? '' : obj;
}

async function migrate() {
  try {
    console.log('🚀 Migrating to Firestore...\n');
    
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'portfolio.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    let success = 0;
    let failed = 0;

    // Projects
    console.log('📦 Projects...');
    for (const item of data.projects || []) {
      try {
        const { id, ...rest } = item;
        await setDoc(doc(db, 'projects', id), clean(rest));
        console.log(`  ✓ ${item.title}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${item.title}: ${e.message}`);
        failed++;
      }
    }

    // Skills
    console.log('\n🎯 Skills...');
    for (const item of data.skills || []) {
      try {
        const { id, ...rest } = item;
        await setDoc(doc(db, 'skills', id), clean(rest));
        console.log(`  ✓ ${item.name}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${item.name}: ${e.message}`);
        failed++;
      }
    }

    // Timeline
    console.log('\n📅 Timeline...');
    for (const item of data.timeline || []) {
      try {
        const { id, ...rest } = item;
        await setDoc(doc(db, 'timeline', id), clean(rest));
        console.log(`  ✓ ${item.title}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${item.title}: ${e.message}`);
        failed++;
      }
    }

    // GitHub
    console.log('\n🐙 GitHub...');
    if (data.github) {
      try {
        await setDoc(doc(db, 'github', 'settings'), clean(data.github));
        console.log('  ✓ Settings');
        success++;
      } catch (e) {
        console.error(`  ✗ ${e.message}`);
        failed++;
      }
    }

    // Profile
    console.log('\n👤 Profile...');
    if (data.profile) {
      try {
        await setDoc(doc(db, 'profile', 'info'), clean(data.profile));
        console.log('  ✓ Info');
        success++;
      } catch (e) {
        console.error(`  ✗ ${e.message}`);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(40));
    console.log(`✅ Success: ${success} | ❌ Failed: ${failed}`);
    console.log('='.repeat(40));
    
    if (failed === 0) {
      console.log('\n🎉 Migration complete!');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

migrate().then(() => process.exit(0));
