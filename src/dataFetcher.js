const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');

// HTTPS agent to bypass SSL certificate issues (use cautiously)
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const cdpDocs = [
    {
        name: 'Segment',
        url: 'https://segment.com/docs/?ref=nav',
        filePath: './data/segment-docs.txt'
    },
    {
        name: 'mParticle',
        url: 'https://docs.mparticle.com/',
        filePath: './data/mparticle-docs.txt'
    },
    {
        name: 'Lytics',
        url: 'https://docs.lytics.com/',
        filePath: './data/lytics-docs.txt'
    },
    {
        name: 'Zeotap',
        url: 'https://docs.zeotap.com/home/en-us/',
        filePath: './data/zeotap-docs.txt'
    }
];

cdpDocs.forEach(async (cdp) => {
    try {
        const response = await axios.get(cdp.url, { httpsAgent });
        const $ = cheerio.load(response.data);

        // Remove irrelevant elements and extract main content
        $('script, style, noscript, header, footer').remove();
        const relevantContent = $('body')
            .text()
            .replace(/\s+/g, ' ') // Remove excessive whitespace
            .trim();

        fs.writeFileSync(cdp.filePath, relevantContent);
        console.log(`${cdp.name} documentation saved as text.`);
    } catch (error) {
        console.error(`Error fetching ${cdp.name} documentation:`, error.message);
    }
});
