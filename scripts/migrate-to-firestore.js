/**
 * Fixed Migration Script: Portfolio JSON to Firestore
 * Properly handles data sanitization for Firestore
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Firebase config from environment
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

// Sanitize data for Firestore
function sanitize(obj) {
  if (Array.isArray(obj)) {
    return obj.filter(v => v != null && v !== '').map(sanitize);
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip null, undefined, and empty strings
      if (value == null || value === '') continue;

      // Convert '#' to empty string (Firestore doesn't like it)
      if (value === '#') {
        result[key] = '';
      } else if (typeof value === 'object') {
        result[key] = sanitize(value);
      } else {
        result[key] = value;
      }
    }


    return result;
  }

  return obj === '#' ? '' : obj;
}

async function migrate() {
  console.log('🚀 Starting Firestore Migration...\n');

  try {
    // Read portfolio.json
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'portfolio.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    let success = 0;
    let failed = 0;

    // Migrate Projects
    console.log('📦 Migrating Projects...');
    for (const project of data.projects || []) {
      try {
        const { id, ...rest } = project;
        const cleaned = sanitize(rest);
        await setDoc(doc(db, 'projects', id), cleaned);
        console.log(`  ✓ ${project.title}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${project.title}: ${e.message}`);
        failed++;
      }
    }

    // Migrate Skills
    console.log('\n🎯 Migrating Skills...');
    for (const skill of data.skills || []) {
      try {
        const { id, ...rest } = skill;
        const cleaned = sanitize(rest);
        await setDoc(doc(db, 'skills', id), cleaned);
        console.log(`  ✓ ${skill.name}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${skill.name}: ${e.message}`);
        failed++;
      }
    }

    // Migrate Timeline
    console.log('\n📅 Migrating Timeline...');
    for (const item of data.timeline || []) {
      try {
        const { id, ...rest } = item;
        const cleaned = sanitize(rest);
        await setDoc(doc(db, 'timeline', id), cleaned);
        console.log(`  ✓ ${item.title}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${item.title}: ${e.message}`);
        failed++;
      }
    }

    // Migrate GitHub Settings
    console.log('\n🐙 Migrating GitHub Settings...');
    if (data.github) {
      try {
        const cleaned = sanitize(data.github);
        await setDoc(doc(db, 'github', 'settings'), cleaned);
        console.log('  ✓ Settings saved');
        success++;
      } catch (e) {
        console.error(`  ✗ ${e.message}`);
        failed++;
      }
    }

    // Migrate Profile
    console.log('\n👤 Migrating Profile...');
    if (data.profile) {
      try {
        const cleaned = sanitize(data.profile);
        await setDoc(doc(db, 'profile', 'info'), cleaned);
        console.log('  ✓ Profile saved');
        success++;
      } catch (e) {
        console.error(`  ✗ ${e.message}`);
        failed++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`✅ Success: ${success} | ❌ Failed: ${failed}`);
    console.log('='.repeat(50));

    if (failed === 0) {
      console.log('\n🎉 Migration Complete!');
      console.log('💡 Your data is now in Firestore.');
      console.log('\n📝 Next: Update src/lib/api.js to use Firestore');
    } else {
      console.log('\n⚠️  Some items failed. Check errors above.');
    }

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
