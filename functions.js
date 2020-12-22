const admin = require('firebase-admin');
const db = admin.firestore();
const userRef = db.collection('Users');
const bcrypt = require('bcryptjs'); 
const axios = require("axios")

// global vars
this.email = '';
this.isValid = false;
this.result = false;
this.id = null;


// Check if user from this email is exists
const emailExists = async email => {
    const user = await userRef.where('email', '==',  email).get() // find user in db
    return user.empty;
}

// Add record to database 
const addCollection = async (collection, data) => {
    await db.collection(collection).add(data);
    return data;
}
 
// Encrypt password
const bcryptPassword = async (password) => {
    // Encrypt password
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashPassword = await bcrypt.hashSync(password, salt)
    return hashPassword;
}

// Compare client password to password in db
const comparePasswords = async (email, clientPassword) => {
    this.email = email;
    this.isValid = true;
    const user =  await userRef.where('email', '==',  email).get().catch(err => console.log(err)); // find user in db

    user.forEach( async (doc) => {
        this.result = bcrypt.compare(clientPassword, doc.data().password).then(res => {
            return res;
        }).catch(err => console.log(err));
    });
    return this.result;
}
 
// Get all data of user and save this in "result" var. User id also saved to global var
const getAllDataOfuser = async () => {
    if(this.isValid == true){
        const user =  await userRef.where('email', '==',  this.email).get().catch(err => console.log(err)); // find user in db
        user.forEach(doc => {
            this.result = doc.data();
            this.id = doc.data().id;
        })
        return this.result;
    }else{
        return this.result;
    }
}

// return user id of logged user
const getUserId = async () => {
    return this.id;
}

// get data from https://api.ipify.org
const getData = new Promise(async (resolve, reject) => { // make promise 
    resp = axios.get(process.env.REQUEST_LINK).then((response) => {
        resolve(response) 
    }).catch((err) => reject(err));
}).then((resp) => {
    return resp.data.ip;
}).catch((err) => {
    throw err;
})

module.exports.emailExists = emailExists;
module.exports.addCollection = addCollection;
module.exports.bcryptPassword = bcryptPassword;
module.exports.comparePasswords = comparePasswords;
module.exports.getAllDataOfuser = getAllDataOfuser;
module.exports.getUserId = getUserId;
module.exports.getData = getData;