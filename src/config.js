"use strict";
const config = {
// Configuration variables
    port : process.env.PORT || '27017',
    mongoURI : process.env.MONGODB_URI || 'mongodb+srv://golocal:backend@cluster0-dvenz.mongodb.net/golocal-db?retryWrites=true&w=majority',
    jwtSecret : process.env.JWT_SECRET || 'golocal-secret-key'
}
export default config