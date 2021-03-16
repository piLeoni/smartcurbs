
var { Pool } = require('pg');

exports.lambdaHandler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;


    const pool = new Pool();
    const client = await pool.connect().catch(error => {
        callback(null, {
            'statusCode': 500,
            'body': JSON.stringify({
                status: "UP",
                error
            })
        })
    })
    try {
        const result = await client.query(`SELECT COUNT(id) FROM ${process.env.PG_TABLE}`)
        client.release();
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                status: "UP",
                details: {
                    postgresql: {
                        status: "UP",
                        count: result.rows[0].count
                    }
                }
            })
        }

    }
    catch (err) {
        client.release();
        console.log(err)
        return {
            'statusCode': 500,
            'body': JSON.stringify({
                status: "UP",
                error: err
            })
        }
    }
}

