import fs from 'fs';
import Module from 'module';
import path from 'path';

const _module = new Module();
const MODULE_NAME = 'react-bootstrap';

const modulePath = path.dirname(
  Module._resolveFilename(
    MODULE_NAME,
    {
      ..._module,
      paths: Module._nodeModulePaths(process.cwd()),
    }
  )
);

const indexFile = fs.readFileSync(modulePath + '/index.js', 'utf-8');
const regStr = 'exports\.([\\S]+) = \_[\\S]+\[\'default\'\]';

const regx = new RegExp(regStr);
const globalRegx = new RegExp(regStr, 'g');

const pkgMap = indexFile
    .match(globalRegx)
    .map(exp => exp.match(regx).slice(1))
    .reduce((result, [pkgId]) =>
      ({
        ...result,
        [pkgId]: pkgId,
      }),
      {}
    );

module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path) {
      const { node } = path;
      const { specifiers, source } = node;
      const { value: pkgId } = source;

      if (pkgId !== MODULE_NAME) {
        return;
      }

      if (!specifiers.filter(t.isImportSpecifier).length) {
        return;
      }

      specifiers.forEach((spec) => {
        const { local, imported } = spec;
      const { name: localName } = local;

      let importedPath = MODULE_NAME;

      if (t.isImportSpecifier(spec)) {
        const { name: importedName } = imported;
        spec = t.importDefaultSpecifier(t.identifier(localName));

        if (!pkgMap[importedName]) {
          throw new Error(`react-bootstrap does not contain module "${importedName}"`);
        }

        importedPath = `${MODULE_NAME}/lib/${pkgMap[importedName]}`;
      }

      path.insertAfter(t.importDeclaration([spec], t.stringLiteral(importedPath)));
    });

      path.remove();
    },
  },
});