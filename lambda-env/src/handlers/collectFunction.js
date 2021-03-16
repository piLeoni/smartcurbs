
var { Pool } = require('pg');

exports.lambdaHandler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const input = JSON.parse(event.body);
    if (!input.data) {
        callback(null, {
            'statusCode': 400,
            'body': JSON.stringify({
                ok: false,
                error: {
                    category: "request_format",
                    details: "'data' field not present in the POST request"
                }
            })
        })
    }
    if (!input.originTimestamp) {
        callback(null, {
            'statusCode': 400,
            'body': JSON.stringify({
                ok: false,
                error: {
                    category: "request_format",
                    details: "'originTimestamp' field not present in the POST request"
                }
            })
        })
    }

    const pool = new Pool();
    const client = await pool.connect()
    try {
        let inserted = [];
        let rejected = [];
        for (let row = 0; row < input.data.length; row++) {
            try {
                await client.query(formatObject(input.data[row]))
                inserted.push({ id: input.data[row].id });
            }
            catch (error) {
                console.log(error)
                rejected.push({ id: input.data[row].id, error: error.detail });
            }
        }

        client.release();

        let statusCode = (rejected.length) ? 207 : 200;
        // if (rejected.length) statusCode = 203
        callback(null, {
            'statusCode': statusCode,
            'body': JSON.stringify({
                ok: true,
                inserted: inserted,
                rejected: rejected
            })
        })
    }
    catch (err) {
        console.log(err)
        client.release();
        callback(err)
    }
}


function formatObject(data) {
    const text = `INSERT INTO ${process.env.PG_TABLE} (${Object.keys(data).join(', ')}) VALUES (${Object.keys(data).map((el, index) => '$' + (index + 1)).join(', ')}) RETURNING *`
    const values = Object.values(data);
    return { text, values }
}