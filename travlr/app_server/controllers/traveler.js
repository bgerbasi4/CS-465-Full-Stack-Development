const fs = require('fs');
const path = require('path');

const travel = (req, res) => {
    const filePath = path.join(__dirname, '../../data/trips.json');
    const trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    res.render('travel', {
        title: 'Travlr Getaways - Travel',
        trips: trips
    });
};

module.exports = {
    travel
}