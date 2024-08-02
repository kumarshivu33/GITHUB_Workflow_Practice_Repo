const fs = require('fs');
const changes = fs.readFileSync('changes.txt', 'utf-8').split('\n');
const vlocityComponents = changes.filter(change => change.startsWith('vlocity'));
console.log(vlocityComponents); 
const modifiedComponents = [...new Set(vlocityComponents.map(component => {
    const pathParts = component.split('/');
    const desiredPart = pathParts.slice(1, pathParts.length - 1).join('/');
    return desiredPart;
}))].filter(component => component.startsWith('DataRaptor') || component.startsWith('OmniScript') || component.startsWith('IntegrationProcedure') || component.startsWith('FlexCard') );        
const yamlContent = `projectPath: vlocity_build
manifest:
${modifiedComponents.map(component => `  - ${component}`).join('\n')}
delete: true
activate: true
compileOnBuild: true
maxDepth: -1
continueAfterError: true
defaultMaxParallel: 100
exportPacksMaxSize: 10
useAllRelationships: false
supportHeadersOnly: true
ignoreLWCActivationOS: false 
ignoreLWCActivationCards: false
autoUpdateSettings: true
supportForceDeploy: true`; 
fs.writeFileSync('delta-deploy-job.yaml', yamlContent);  
