module.exports =
{
    user: process.env.NODE_ORACLEDB_USER || "system",
    password: process.env.NODE_ORACLEDB_PASSWORD || "oracle",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "192.168.226.30:1521/TEST"
}