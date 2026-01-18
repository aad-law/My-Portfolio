import { db } from './firebase.config';
import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    writeBatch
} from 'firebase/firestore';

// Collection names
const COLLECTIONS = {
    PROJECTS: 'projects',
    SKILLS: 'skills',
    TIMELINE: 'timeline',
    GITHUB: 'github',
    PROFILE: 'profile'
};

/**
 * Get all portfolio data from Firestore
 */
export async function getData() {
    try {
        const data = {
            projects: [],
            skills: [],
            timeline: [],
            github: {},
            profile: {}
        };

        // Fetch all collections in parallel
        const [projectsSnap, skillsSnap, timelineSnap, githubDoc, profileDoc] = await Promise.all([
            getDocs(collection(db, COLLECTIONS.PROJECTS)),
            getDocs(collection(db, COLLECTIONS.SKILLS)),
            getDocs(collection(db, COLLECTIONS.TIMELINE)),
            getDoc(doc(db, COLLECTIONS.GITHUB, 'settings')),
            getDoc(doc(db, COLLECTIONS.PROFILE, 'info'))
        ]);

        // Parse projects
        projectsSnap.forEach((doc) => {
            data.projects.push({ id: doc.id, ...doc.data() });
        });

        // Parse skills
        skillsSnap.forEach((doc) => {
            data.skills.push({ id: doc.id, ...doc.data() });
        });

        // Parse timeline
        timelineSnap.forEach((doc) => {
            data.timeline.push({ id: doc.id, ...doc.data() });
        });

        // Parse github settings
        if (githubDoc.exists()) {
            data.github = githubDoc.data();
        }

        // Parse profile
        if (profileDoc.exists()) {
            data.profile = profileDoc.data();
        }

        return data;
    } catch (error) {
        console.error("Error reading data from Firestore:", error);
        return { projects: [], skills: [], timeline: [], github: {}, profile: {} };
    }
}

/**
 * Save all portfolio data to Firestore
 */
export async function saveData(data) {
    try {
        const batch = writeBatch(db);

        // Save projects
        if (data.projects) {
            for (const project of data.projects) {
                const { id, ...projectData } = project;
                const projectRef = doc(db, COLLECTIONS.PROJECTS, id);
                batch.set(projectRef, projectData);
            }
        }

        // Save skills
        if (data.skills) {
            for (const skill of data.skills) {
                const { id, ...skillData } = skill;
                const skillRef = doc(db, COLLECTIONS.SKILLS, id);
                batch.set(skillRef, skillData);
            }
        }

        // Save timeline
        if (data.timeline) {
            for (const item of data.timeline) {
                const { id, ...itemData } = item;
                const timelineRef = doc(db, COLLECTIONS.TIMELINE, id);
                batch.set(timelineRef, itemData);
            }
        }

        // Save github settings
        if (data.github) {
            const githubRef = doc(db, COLLECTIONS.GITHUB, 'settings');
            batch.set(githubRef, data.github);
        }

        // Save profile
        if (data.profile) {
            const profileRef = doc(db, COLLECTIONS.PROFILE, 'info');
            batch.set(profileRef, data.profile);
        }

        await batch.commit();
        return true;
    } catch (error) {
        console.error("Error saving data to Firestore:", error);
        return false;
    }
}

/**
 * Delete a specific item from a collection
 */
export async function deleteItem(collectionName, itemId) {
    try {
        await deleteDoc(doc(db, collectionName, itemId));
        return true;
    } catch (error) {
        console.error(`Error deleting item from ${collectionName}:`, error);
        return false;
    }
}
