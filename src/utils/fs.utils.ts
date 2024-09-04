import * as fs from 'node:fs/promises';

export async function ensureDirectoryAccess(
  directoryPath: string,
): Promise<void> {
  try {
    await fs.access(directoryPath, fs.constants.R_OK | fs.constants.W_OK);
    return;
  } catch (error) {}

  try {
    await fs.mkdir(directoryPath, { recursive: true });
  } catch (error) {
    throw new Error(`Could not create or access directory ${directoryPath}`);
  }
}

export async function createDirectoryIfNotExists(
  directoryPath: string,
): Promise<void> {
  await fs.mkdir(directoryPath, { recursive: true });
}
