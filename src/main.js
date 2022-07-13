import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import axios from 'axios';
import bcrypt from "bcryptjs";

createApp(App).use(router).mount('#app');


// Authorize user login
async function authLogin(guest){
   
    // const pass = guest.pass;
    // const email = guest.email;
    
    console.log("-TEST LOGIN-")
    let email = 'email123@email.com';
    let pass = 'pass';

    let success = false;
    
    // if user's email and password is not empty
    if(pass != '' && email != ''){


        // get user's data from server
        await axios.post('../api/server.php', {
            action: 'login',                    
            email: email,       
            // email: guest.email,       
        }).then(userResult => {

            // if there is one user
            if(userResult.data.length == 1){

                // set the user
                const user = userResult.data;

                // set the hash
                let hash = user[0].pass;

                // compare the password to the hashed password 
                if(bcrypt.compareSync(pass, hash)){
                                        
                    // store the user's data in the sessionStorage as 'user'
                    sessionStorage.setItem('user', JSON.stringify(user));
                    success = true;
                    
                    console.log("USER LOGGED IN");
                }    
            }      
        });

       
    }else{
        // else, send message to console
        console.log("empty fields");
    }
    
    console.log("authLogin(): " + success);
    return success;
}


// Authorize user registration
async function authRegister(guest){
    // console.log(guest.pass);

    // console.log("Atempting to register...");

    // if(guest.regPass != '' && guest.email != '' && guest.regPass == guest.re_regPass){
        // console.log("pass1: " + guest.regPass);
        const salt =  bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(guest.regPass, salt);
        console.log('hash pass1: ' + hash);
        
        // console.log("testing verification..")
        // console.log("pass1 vs Hash of Pass1")
        // var verified = bcrypt.compareSync(guest.regPass, hash);
        // console.log(verified);
        
        // console.log("pass2 vs Hash of Pass1")
        // var verified = bcrypt.compareSync("err", hash);
        // console.log(verified);
        
        // --- INSERT USER DATA INTO DATABASE ---
        // await axios.post('../api/server.php', {
        //     action: 'register',
        //     email: guest.email,       
        //     pass: hash,
        // }).then(user => {
        //     console.log(user);

        // sessionStorage.setItem('user', JSON.stringify(user));

        // });

    // }else{
    //     console.log("Failed");
    // }  
}





export {authLogin, authRegister} 

