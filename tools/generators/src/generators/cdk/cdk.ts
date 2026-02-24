import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  names,
  readJson,
  offsetFromRoot,
} from '@nx/devkit';
import * as path from 'path';
import { CdkGeneratorSchema } from './schema';

export async function cdkGenerator(tree: Tree, schema: CdkGeneratorSchema) {
  const scope = readJson(tree, 'package.json').name.split('/')[0].substring(1);

  const projectRoot = schema.name;

  if (!projectRoot.includes('/domains/'))
    throw new Error(
      'Sorry: currently, the cdk generator is for packages in a specific domain, eg packages/domains/create/...'
    );

  const packageName = projectRoot.split('domains/')[1].replace(/\//g, '-');

  const offset = offsetFromRoot(projectRoot);

  const name = path.basename(schema.name);

  addProjectConfiguration(tree, schema.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(name),
    packageName,
    offset,
    scope,
    tmpl: '',
  });

  await formatFiles(tree);
}

export default cdkGenerator;
