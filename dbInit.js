const Sequelize = require('sequelize');
const moment = require('moment-timezone');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Mps = require('./models/mps')(sequelize, Sequelize.DataTypes);
const Divisions = require('./models/Division')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {

    const mps = [
        Mps.upsert({ name: 'SampleMp', discord_id: null }),
    ];

    const divisions = [
        Divisions.upsert({
            id: 'SB000',
            url: 'https://reddit.com/r/MHOCHolyroodVote',
            end_date: moment().tz('Europe/London').add(3, 'days').hour(22).minutes(0).seconds(0),
            whip: 'for',
            line: 1,
        }),
    ];

    await Promise.all(divisions);
    await Promise.all(mps);
    console.log('Database synced');

    sequelize.close();
}).catch(console.error);