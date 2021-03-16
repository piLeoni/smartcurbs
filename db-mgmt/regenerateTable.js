#!/usr/bin/env node

require('dotenv').config()

const { Pool } = require("pg");


pool = new Pool();

(async() => {
    console.log(`dropping table ${process.env.PG_TABLE}`)
    await pool.query(`DROP TABLE IF EXISTS ${process.env.PG_TABLE}`)

    console.log(`creating table ${process.env.PG_TABLE}`)
    await pool.query(`CREATE TABLE ${process.env.PG_TABLE}(
                id TEXT PRIMARY KEY , 
                sampleTime TIMESTAMPTZ NOT NULL, 
                busline TEXT,
                camera TEXT,
                countWalkStand INTEGER  NOT NULL,
                countCar INTEGER  NOT NULL,
                countVan INTEGER  NOT NULL,
                countBus INTEGER  NOT NULL,
                countMotorcycle INTEGER  NOT NULL,
                countRidingBike INTEGER  NOT NULL,
                countChildren INTEGER  NOT NULL,
                countSkateboarder INTEGER  NOT NULL,
                countQueuing INTEGER  NOT NULL,
                countSit INTEGER  NOT NULL,
                countTruck INTEGER  NOT NULL,
                countRidingScooter INTEGER  NOT NULL,
                lat REAL,
                lon REAL,
                satellites INTEGER,
                horizontalDilution REAL,
                compass REAL,
                speed REAL,
                lastGPSDatetime TEXT, 
                upTimeOS INTEGER,
                cpuTemp REAL,
                cpuAvgLoad REAL,
                currentNetwork TEXT,
                currentIp TEXT,
                usedRam REAL,
                aliveConn BOOLEAN,
                avgPingTime REAL,
                debug TEXT,
                batVolt REAL,
                batChrg REAL,
                batPlug BOOLEAN,
                imuAccX REAL,
                imuAccY REAL,
                imuAccZ REAL,
                imuMagX REAL,
                imuMagY REAL,
                imuMagZ REAL,
                imuGyrX REAL,
                imuGyrY REAL,
                imuGyrZ REAL,
                imuTemp REAL,
                dbTotal INTEGER, 
                dbUploaded INTEGER
                )`)
        .finally(() => {
            pool.end()
        })


})().then()
    .catch(err => console.log(err.message))