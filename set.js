const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lZanVRdS8xeUJIcGhpaTYxbG15d0w0RTBVa0hyOFdCejRHd3hjTWJYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDhTa05Pdk52ZzA4OVFvcU9pL2t5YzhaamNwMElyMitsdnRnalhRa3RuND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQWZZRWppaUQvbWwrUWdNeHZvb3hBMUwyajNFaHpKL1JCMk1LZ1lKVzBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKZ1p3ZUdpQ1U2bDFTUzZXdFlYNzNJUWVxdndlMFF2dnlNNk55YndNUkc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFITnRURlVlUUJuYS9iNmtWeGdwRjhabko2WnpnK3lVckFGWFBud2FjWHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBiR0xiMEtUaWhVMnhiejhqYy8xejN0WG5TVStnYlVQVDdiTit0QXdJMEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk40WnRieEppZlcySG4zRG43TE1ZdTVVSTZtS3ZRejJoVVY1dzA4SmVVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3NueHJ0SHg0V21aVlZqd29RQ2VWSkhtOUt4Rzh3NTAyVTBTVkdJZ0xWdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFwQW5UT09PdnVubTNJRVdJZWpwZ3dHTUJQS0Z3N1AzYkllV0NBLzlZSGZEMFlCYUhKc3hzQjNIdE9nOGxabVRSRGp5REhVdCtOSUh1a3ZDUWlyT0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6IlJYcFNpVFNaZmRDOStsTXJ4RzdXWFFHR2JvSVd3V1hZUWpZOGcvNy8xUnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxRjZGQURERDk0NDlBNzlENDlFRDY3NzY2NTI1RkJFMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NDQ2MDg0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTMzNTIyMDgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjEzQjZCRTc0RDg2MDM1NjdDNDQ3OUJEQzQ4OTI4NTlCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk0NDYwODd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkdLNVhUUURSIiwibWUiOnsiaWQiOiIyMzQ4MTMzNTIyMDgzOjI3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjYxMzE5MTY1MDE0MTA1OjI3QGxpZCIsIm5hbWUiOiJBbm9ueW1vdXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wrWWxLSUJFTFBibWNJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkFTZFJibW5lRytqTFA0dnRjZSsxc05MQU9LcElhVEFnclNaN3BYbUQxMTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlUrZU1rdlg3ZDQ2Slk4QVZMMXlZYWFYTDlidS9VYWRBZWVzSEg5c0JTaVZYUFpCRWZKSzdxbTNRcjJFcmpNaHpwUlNkZGNGSnB3eER0Y01ydlMwY0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsUHlYSzVSVDM0d0RMalZQRjJaOS9KajEwSzhyalByVWVENUtEbkVWM0ZhY2RMV0ZLNDlNUjd1RWFyYzZLNXVzZi93UlZaLzRHS250K28zUHNhbnZDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMzM1MjIwODM6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUVuVVc1cDNodm95eitMN1hIdnRiRFN3RGlxU0drd0lLMG1lNlY1ZzlkZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NDQ2MDgxLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9sKyJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Anonymous",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Anonymous-Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

