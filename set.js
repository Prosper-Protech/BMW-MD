const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkp3bzF4Y1FJZEJXZWIrdDNac2lHdHFmSGJVcnYyZmxpRmpMYkpNd1BIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3VTcTliZVFhSmlRbWtFZWVveGxrUGd4azRjdWhrbzRkMko1RmlROVUzTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRFB6ZkIydlljNDloc0l2NW5WSytOT0FvNGhmOTZ1QTRhRU5XbjN3MlZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuZVdCKzJnRC9OVmU5NU9rbTRKcDJvNTlYSVMvMlh6bExLUVJUMUlUbTNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRKOGZ6QnB5TGdpenQwMEV2WmF3TmhpaU1nUDVBakxDYmprTEJXL2ZjRTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpuaEwvY0dPMjJkRyt3cUh4dzRrWlZjeWRJbFdUQWZNQWRlMDhnWUk4U0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUxIMzFJdERPbjJUWFFMbzVUNUxrVkViKzJCR3ZwTVNqb1pRM20zd1Eydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSk00cGhDKzlDemFtMDZ3MHp1QkxKWDBRL1FtSWsxRHRtb2FDTDlJOXhDZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJEcEJCaXVqdWlpZG1tL0EvZERYRTE2anp1YWl1RnVIYWoycUJSL2N2cU5zMjgrcXVYcFhUWDR5NDIwY0dqRlk4eWtKVG9qb2pzTXlTbHR2WGRXSkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE4LCJhZHZTZWNyZXRLZXkiOiJ5RXRLa2pmVHYvZVR0d1l4Nk5FL0pDOUE5OUpNMWNhc2tEL0ZlSVFjMExZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJRWDZpdWtHNFJmMkoyLTJ0Sl9DRzRRIiwicGhvbmVJZCI6IjdmYzFlMzIxLTlmZWMtNGRmOC05YzFlLWY3YjY2MGQ1MzhlYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRnNzUVJRYmk5UEZLVU1rREhjRzNpbFFJalE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclE2dElpTVA5QjRTZ1g5c25TMGlxaFVVOTMwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJTOFJFUFFXIiwibWUiOnsiaWQiOiIyMzc2NzM4MDUyMDg6ODJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRW5nLlByb1RlY2gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lEZDFQTUhFSVdHL3JJR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ijl0Y3RwM1ZINTF5czVteXg0VUtaMWhhVG1NMHE3UG55TkNHd2tkQlZoMDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ing5cTB1VEc5cUJXOUtsY3M3ZGxXM2ZlUFl3RFhLNXRyWGpkZzhtanZiQko0M2VEK0RGdW0vTW1DQ2tKOFJ6M0x5T2ppaU9VQWR5Qng0S1FGRGJRQUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiRTZvekNGTnlnZ0xOU1dWZ1ZRb2pTWU1NeGZFeXBoZGVqTGtEMzRMS2czOEJIektuS3p6cExRckZVRUFpcjFLUmZrQzRDV1dTQ2pQN3lhSFEzbURCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY3MzgwNTIwODo4MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmYlhMYWQxUitkY3JPWnNzZUZDbWRZV2s1ak5LdXo1OGpRaHNKSFFWWWRPIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE3NTM1NTA2fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

