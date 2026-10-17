import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import katex from 'katex';
let count=0, projects=0;
for(const name of fs.readdirSync('client/src/pages').filter(n=>n.endsWith('Page.tsx'))){
 const source=fs.readFileSync(`client/src/pages/${name}`,'utf8');
 if(!source.includes('MathFormula'))continue;projects++;
 const tree=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const check=(tex:string)=>{assert.doesNotThrow(()=>katex.renderToString(tex,{throwOnError:true,strict:'error'}),`${name}: ${tex}`);count++;};
 function visit(node:ts.Node){
  if(ts.isTaggedTemplateExpression(node)&&node.tag.getText(tree)==='String.raw'){
   const template=node.template;
   if(ts.isNoSubstitutionTemplateLiteral(template))check(template.rawText ?? template.text);
   else if(ts.isTemplateExpression(template)){
    // Page formulas interpolate numbers; build a representative numeric expression.
    const tex=(template.head.rawText??template.head.text)+template.templateSpans.map(s=>'1'+(s.literal.rawText??s.literal.text)).join('');
    // Spherical-harmonics symbolic builders also interpolate LaTeX commands.
    if(name!=='SphericalHarmonicsPage.tsx')check(tex);
   }
  }ts.forEachChild(node,visit);
 }visit(tree);
}
assert.equal(projects,23);assert.ok(count>80);
console.log(`Validated ${count} LaTeX expressions across ${projects} Physics Lab projects.`);
