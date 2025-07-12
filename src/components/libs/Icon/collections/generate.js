'use server'

import { lookupCollection } from '@iconify/json';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const collectionsToProcess = [
    'mdi',
    'fa-solid',
    'tabler',
    'feather',
    'ph',
    'heroicons-solid',
    'line-md'
];

const collectionLabelMap = {
    'mdi': 'Material',
    'fa-solid': 'Font Awesome Solid',
    'tabler': 'Tabler Icons',
    'feather': 'Feather Icons',
    'ph': 'Phosphor Icons',
    'heroicons-solid': 'Heroicons Solid',
    'line-md': 'Line Material Design'
};

const targetDir = path.dirname(new URL(import.meta.url).pathname);
const indexOutputFile = path.join(targetDir, 'index.ts');
// --- End Configuration ---

/**
 * Converts kebab-case to PascalCase. Handles digits.
 */
function createSafeIconKey(iconName) {
    if (!iconName || typeof iconName !== 'string') return 'InvalidIconName';
    let safeName = iconName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    if (/^\d/.test(safeName)) safeName = 'Icon' + safeName;
    safeName = safeName.replace(/[^a-zA-Z0-9_]/g, '');
    if (!/^[a-zA-Z_]/.test(safeName)) safeName = '_' + safeName;
    return safeName;
}

/**
 * Converts kebab-case to camelCase. Handles digits.
 */
function kebabToCamelCase(str) {
    if (!str || typeof str !== 'string') return 'invalidName';
    let camelCaseStr = str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
    // Ensure it's a valid variable name start
    if (/^\d/.test(camelCaseStr)) {
        camelCaseStr = 'icon' + camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
    } else if (!/^[a-zA-Z_]/.test(camelCaseStr)) {
        camelCaseStr = '_' + camelCaseStr;
    }
    return camelCaseStr;
}

// --- Main Script Logic ---
(async () => {
    console.log(`Starting generation for collections: ${collectionsToProcess.join(', ')}`);

    const generatedIndexData = []; // Store info needed for index.ts
    let successCount = 0;
    let errorCount = 0;
    let totalIconsProcessed = 0;

    for (const collectionName of collectionsToProcess) {
        console.log(`\nProcessing collection: ${collectionName}...`);
        try {
            const collection = await lookupCollection(collectionName);
            if (!collection) throw new Error(`Collection metadata not found`);

            const iconMap = {};
            let collectionIconCount = 0;
            const mapVariableName = kebabToCamelCase(collectionName) + 'Icons'; // e.g., mdiIcons, faSolidIcons
            const individualFileName = `${collectionName}-icons.ts`;
            const individualFilePath = path.join(targetDir, individualFileName);

            // Process icons and aliases
            const combinedIcons = { ...collection.icons, ...(collection.aliases || {}) };

            for (const iconName in combinedIcons) {
                const safeKey = createSafeIconKey(iconName);
                // For aliases, the value should still point to the alias name itself
                const iconValue = `${collectionName}:${iconName}`;

                if (safeKey !== 'InvalidIconName') {
                    if (!iconMap[safeKey]) {
                        iconMap[safeKey] = iconValue;
                        collectionIconCount++;
                    } else {
                        // Only warn if the conflicting key points to a different icon string
                        if (iconMap[safeKey] !== iconValue) {
                            console.warn(`  [WARN] Skipping '${iconName}'. PascalCase name '${safeKey}' already exists for '${iconMap[safeKey]}'.`);
                        }
                    }
                }
            }

            if (collectionIconCount > 0) {
                // Generate content for individual file
                const fileContent = `// Auto-generated from @iconify/json/${collectionName}
// Do not edit manually!

export const ${mapVariableName}: { [key: string]: string } = ${JSON.stringify(iconMap, null, 2)};
`;
                // Write individual file
                await fs.writeFile(individualFilePath, fileContent, 'utf8');
                console.log(`  Generated ${collectionIconCount} icons into ${individualFileName}`);

                // Store data for index.ts
                generatedIndexData.push({
                    key: collectionName,
                    label: collectionLabelMap[collectionName] || collectionName,
                    mapVariableName: mapVariableName,
                    fileName: individualFileName.replace('.ts', '') // for import statement
                });
                totalIconsProcessed += collectionIconCount;
                successCount++;
            } else {
                console.log(`  No icons found or processed for ${collectionName}.`);
            }

        } catch (error) {
            console.error(`[ERROR] Failed to process collection ${collectionName}:`, error.message);
            errorCount++;
        }
    }

    // --- Generate index.ts --- 
    if (generatedIndexData.length > 0) {
        console.log(`\nGenerating ${indexOutputFile}...`);

        // Generate import statements
        const importStatements = generatedIndexData
            .map(data => `import { ${data.mapVariableName} } from './${data.fileName}';`)
            .join('\n');

        const interfaceContent = `
// Interface for a single icon set
export interface IconSet {
  label: string;
  key: string;
  icons: { [PascalCaseName: string]: string }; // Map PascalCase name to 'prefix:kebab-name'
}
`;

        // Generate the iconSets array structure
        const iconSetsArrayElements = generatedIndexData
            .map(data => `  {
    label: '${data.label.replace(/'/g, "\\'")}',
    key: '${data.key}',
    icons: ${data.mapVariableName} // Use imported variable
  }`)
            .join(',\n');

        const exportContent = `
// Array containing all processed icon sets
export const iconSets: IconSet[] = [
${iconSetsArrayElements}
];
`;

        // Generate the flattened map using the imported variables
        const flatMapLogic = generatedIndexData
            .map(data => `    Object.assign(acc, ${data.mapVariableName});`)
            .join('\n');

        const flatMapContent = `
// Optional: Flattened map for direct lookup by PascalCase name across all sets.
// Note: If icons share the same PascalCase name across sets, the last one processed wins.
export const allIcons: { [PascalCaseName: string]: string } = (() => {
  const acc = {};
${flatMapLogic}
  return acc;
})();
`;

        // Generate the JSON paths map
        const jsonPathBase = 'static/icons/'; // Relative path from public directory
        const jsonPathsObjectElements = generatedIndexData
            .map(data => `  '${data.key}': '/${jsonPathBase}${data.key}.json'`) // Add leading slash for root-relative path
            .join(',\n');

        const jsonPathsExport = `
// Paths to the original JSON icon data files (relative to project root)
export const iconJsonPaths: { [key: string]: string } = {
${jsonPathsObjectElements}
};
`;

        const indexFileContent = `// Auto-generated by src/components/libs/Icon/collections/generate.js
// Do not edit manually!

// Import maps from individual files
${importStatements}

${interfaceContent}${exportContent}${flatMapContent}${jsonPathsExport}
`;

        try {
            await fs.writeFile(indexOutputFile, indexFileContent, 'utf8');
            console.log(`Successfully wrote index file to ${indexOutputFile}`);
        } catch (error) {
            console.error(`[ERROR] Failed to write index file ${indexOutputFile}:`, error);
            errorCount++;
        }
    } else {
        console.log('\nSkipping index.ts generation as no collections were successfully processed.');
    }
    // --- End Generate index.ts ---

    console.log(`\nGeneration complete. Total Icons: ${totalIconsProcessed}, Success Collections: ${successCount}, Errors: ${errorCount}`);
    process.exit(errorCount > 0 ? 1 : 0);

})();
