<template>
<div class="auth">
    <div class="auth-container">

        <!-- Login Page -->
        <div class="login" v-show="loginDisplay">
            <h1 id="title">LOGIN</h1>
            <hr>
            <div class="email-container">
                <label for="email"><b>Email</b></label>
                <input class="email" type="text" name="email" v-model="guest.email" required>
            </div>
            <div class="pass-container">
                <label for="psw"><b>Password</b></label>
                <input name="psw" type="password" v-model="guest.pass" required>
                <a href="">Forgot password?</a>    
            </div>
            <hr>
            <button type="submit" class="submit-btn" @click="login">Submit</button>
            <p class="switch">Don't have an account? <span @click="swapView">Register here!</span></p>
        </div>    

        <!-- Register Page -->
        <div class="register" v-show="!loginDisplay">
            <h1 id="title">REGISTER</h1>
            <p id="info">Please fill out this form to create an account.</p>
            <hr>
            <div class="email-container">
                <label for="email"><b>Email</b></label>
                <input class="email" type="text" name="email" v-model="guest.email" required>
            </div>
            <div class="pass-container">
                <label for="psw"><b>Password</b></label>
                <input name="psw" type="password" v-model="guest.regPass" required>
            </div>
            <div class="re-pass-container">
                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input name="psw" type="password"  v-model="guest.re_regPass" required>
            </div>
            <hr>
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="submit-btn" @click="register">Submit</button>
            <div class="switch">
                <p>Already have an account? <span @click="swapView">Login here!</span></p>
            </div>
        </div>
    </div>     
</div>
</template>
<script>

import { authLogin, authRegister } from '../main.js'
import router from '../router/index.js'

export default {
    name: "Login",
    data(){
        return{
            loginDisplay: true,
            guest: {
                email: '',
                pass: '',
                regPass: '',
                re_regPass: '',
            }
        };
    },
    methods: {
        
        async login(){

            let results = await authLogin(this.guest);
            if(results){
                router.back();
                this.$emit('updateLogout', true);         
            }else{
                console.log("Incorrect email or password!")
            }           
        },

        // call authRegister method from main.js
        register(){
            authRegister(this.guest);
        },
        
        // swap display
        swapView(){
            this.loginDisplay = !this.loginDisplay;
            this.reset();
        },

        // reset input fields
        reset(){
            this.guest.pass = '';
            this.guest.regPass = '';
            this.guest.re_regPass = '';
            
        },
    },   
}
</script>

<style scoped>

    *{
        box-sizing: border-box;
        font-size: 16pt;
        color: white;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    .auth {
        width: 100%; 
        min-height: 100%; 
        overflow: auto;
    }

    .auth-container {
        max-width: 800px; 
        margin: 0 auto; /* 15% from the top and centered */
        background-image: linear-gradient(60deg, rgb(27, 27, 27) 40%, rgb(10, 10, 10));
        padding: 20px 20px 50px 20px;
        min-height: 600px;
    }

    #title {
        font-size: 22pt;
        text-align: center;
        padding: 20pt 0 25pt 0;     
        letter-spacing: +15.5px;
    }

    #info {
        text-align: center;
        padding: 16px 0px 10px 0px;
    }

    .email-container, .pass-container, .re-pass-container{
        padding: 10px 0;
    }

    .pass-container{
        margin: 0 0 10px 0;
    }

    .pass-container a{
        padding: 0 0 0 5px;
        color: #c540d6;
    }
    
    .pass-container a:hover{
        color: #9330a0;
    }

    label b{
        font-size: 16px;
        letter-spacing: +5.5px;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 25px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
        color: black;
        font-size: 17px;

    }
    
    input[type=text]:focus, input[type=password]:focus {
        background-color: rgb(219, 219, 219);
        outline: none;
    }

    hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
    }
    
    .submit-btn {
        display: block;
        text-align: center;
        padding: 16px 20px;
        margin: 30px auto;
        width: 400px;
        border: none;
        cursor: pointer;
        color: white;
        opacity: 0.9;
        letter-spacing: +2.5px;
        background-image: linear-gradient(90deg, #04AA6D 30%, #026b45);
        border-radius: 0.4rem;;
        transition: 5s;
    }

    .submit-btn:hover {
        opacity:1;
        background-image: linear-gradient(40deg, #04AA6D 30%, #021b6b);
    }

    .switch {
        text-align: center;
    }

    .switch span{
        color: #c540d6;
        text-decoration: underline;
        cursor: pointer;
    }
    
    .switch span:hover {
        color: #8e2f9b;
    }

    @media screen and (max-width: 440px) {
        .submit-btn {
            width: 100%; 
        }
    }

</style>