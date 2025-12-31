import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export async function getData() {
    try {
        const fileContents = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading data:", error);
        return { projects: [], skills: [] }; // Fallback
    }
}

export async function saveData(data) {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error saving data:", error);
        return false;
    }
}
