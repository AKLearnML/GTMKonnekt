const fs = require('fs');

const text = `PROSPECT NAME:
Acme Corp

HEADLINE:
Powering Acme Corp to market leadership with AI

SUBTITLE:
A strategic partnership to accelerate AI-driven growth and category dominance.

PILLAR 1 TITLE:
Innovation
PILLAR 1 CAPABILITY 1:
AI Search
PILLAR 1 DESC 1:
Boost conversion
PILLAR 1 CAPABILITY 2:
Agentic AI
PILLAR 1 DESC 2:
Do tasks
`;

const getSection = (text, header) => {
    const regex = new RegExp(`^${header}:\\s*\\n([\\s\\S]*?)(?=^([A-Z0-9 ]+):|\\$)`, "m");
    console.log("Regex for", header, ":", regex);
    const match = text.match(regex);
    return match ? match[1].trim() : "";
};

console.log("PROSPECT NAME:", getSection(text, "PROSPECT NAME"));
console.log("HEADLINE:", getSection(text, "HEADLINE"));

// What if we use \r\n?
const textWin = text.replace(/\n/g, '\r\n');
console.log("WIN PROSPECT NAME:", getSection(textWin, "PROSPECT NAME"));
