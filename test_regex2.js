const text = `PROSPECT NAME:
Acme Corp

HEADLINE:
Powering Acme Corp to market leadership with AI

SUBTITLE:
A strategic partnership to accelerate AI-driven growth and category dominance.

PILLAR 1 TITLE:
Innovation`;

const getSection1 = (header) => {
    const regex = new RegExp(`^${header}:\\s*([\\s\\S]*?)(?=^([A-Z0-9 ]+):|\\$)`, "m");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
};

const getSection2 = (header) => {
    // If we remove the "m" flag for $, it means end of string. 
    // BUT we need ^ to mean start of line for the lookahead. 
    // We can use (?:\\n|^) instead of ^ if we don't use "m", but "m" makes ^ match start of line.
    // In javascript, $ with "m" matches end of line.
    // Let's use (?:\\n[A-Z0-9 ]+:|$) without "m"? No, we can just use Lookahead for another header or End of String.
    // End of string is matched by $ without "m", or we can just use end of string [\s\S]*$

    // Let's test what getSection1 does:
    let match = text.match(new RegExp(`^${header}:\\s*([\\s\\S]*?)(?=^([A-Z0-9 ]+):|$)`, "m"));
    return match ? match[1].trim() : "";
}

console.log("TEST 1 - NAME:", JSON.stringify(getSection1("PROSPECT NAME")));
console.log("TEST 1 - HEADLINE:", JSON.stringify(getSection1("HEADLINE")));

const getSection3 = (header) => {
    // Try matching up to either a newline followed by a valid header, OR the absolute end of the string.
    // To match absolute end of string with "m" flag, we can't easily rely on $. 
    // Actually, we can just lookahead for ^[A-Z0-9 ]+:  OR end of string.
    const regex = new RegExp(`^${header}:\\s*([\\s\\S]*?)(?=(?:^[A-Z0-9 ]+:)|$)`, "gm");
    // using matchAll or exec to see what it matched
    let match = regex.exec(text);
    return match ? match[1].trim() : "";
}
console.log("TEST 3 - NAME:", JSON.stringify(getSection3("PROSPECT NAME")));
console.log("TEST 3 - HEADLINE:", JSON.stringify(getSection3("HEADLINE")));
