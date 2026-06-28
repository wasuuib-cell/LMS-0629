const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  "import { DashboardLayout } from '../components/Layout';",
  "import { DashboardLayout } from '../components/Layout';\nimport { CardMarkTab } from '../components/CardMarkTab';"
);

const renderTarget = "{activeTab === 'overview' && renderOverview()}";
code = code.replace(
  renderTarget,
  "{activeTab === 'cardmark' && <CardMarkTab />}\n          " + renderTarget
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log('Restored CardMarkTab!');
