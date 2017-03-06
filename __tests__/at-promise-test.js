'use strict'

const selfTimer = require('../src/build/promise/intermediate/selftimer');

describe('SelfTimer.js *test group Test', () => {
    const _str = "working";

    it('SelfTimer at().Between Test', () => {

        let date = new Date();

        let start = date.getHours();

        const task = new selfTimer(date);

        task.at(true)
            .Between('1:00 am', '12:59 am')
            .then((res) =>{ expect(res).toBeTruthy(); })
            .catch((res) => { });


    });

    it('SelfTimer at().Unless() Test', () => {

        let date = new Date();

        let start = date.getHours();

        const task = new selfTimer(date);

        task.at(true)
            .Unless('1:00 pm', '12:59 pm')
            .then((res) => {expect(res).toBeTruthy()})
            .catch((res) => {});

    });

    it('SelfTimer at().Hour Test', () => {

        let date = new Date();
        const task = new selfTimer(date);

        task.at(true)
            .Hour(date.getHours())
            .then((res) => expect(res).toBeTruthy() )
            .catch((res) => {});
    });

    it('SelfTimer at().HoursBetween Test', () => {

        let date = new Date();
        const task = new selfTimer(date)

        task.at(true)
            .HoursBetween(0, 23)
            .then((res) => expect(res).toBeTruthy() )
            .catch((res) => {});

    });

    it('at.().HourSelects Test', () => {

        let date = new Date();
        const task = new selfTimer(date)

        const hours = Array.from(Array(24).keys());

        task.at(true)
            .HourSelects(hours)
            .then((res) => expect(res).toBeTruthy() )
            .catch((res) => {});
    });

});
