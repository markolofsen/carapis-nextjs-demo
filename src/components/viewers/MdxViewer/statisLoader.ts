import fs from 'fs';
import path from 'path';

import { MdxDocumentation } from './types';

export class MdxLoader {
  private docsDir: string;

  constructor(docsDir: string) {
    this.docsDir = docsDir;
  }

  /**
   * Load a single MDX file
   */
  loadFile(filename: string): string {
    const filePath = path.join(this.docsDir, filename);
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Load multiple MDX files by filenames
   */
  loadFiles(filenames: string[]): MdxDocumentation {
    const docs: MdxDocumentation = {};

    filenames.forEach((filename) => {
      const key = filename.replace('.mdx', '');
      docs[key] = this.loadFile(filename);
    });

    return docs;
  }

  /**
   * Load all MDX files from the directory
   */
  loadAll(): MdxDocumentation {
    const files = fs.readdirSync(this.docsDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    return this.loadFiles(mdxFiles);
  }

  /**
   * Static method for quick initialization
   */
  static fromDocsDir(docsDir: string): MdxLoader {
    return new MdxLoader(docsDir);
  }

  /**
   * Static method for loading all MDX files in getStaticProps
   */
  static loadAll(docsDir: string): MdxDocumentation {
    const loader = new MdxLoader(docsDir);
    return loader.loadAll();
  }
}
