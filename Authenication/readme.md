
Gen tokens and refresh tokens on end os session


Increases Security 

Lib needed

-> Json web token
-> dotenv
-> express - install nodemon for automatic updating of code in server without restarting it


MAIN PROCESSES
-> Import lib
-> create function
-> app.post , 
-> Generate the secret key through the crypto library 
-> convert the generated token in the form of a hex decimal string 
-> then pass and store those tokens in the dot env file 
-> make sure those files are configured to main file
-> Stateless 