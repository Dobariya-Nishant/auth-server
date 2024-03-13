# auth-server


server directory contains APIs
to run project need to stard mongodb fist for that 

in AUTH-SERVER directory run below command
>>sudo docker compose up

if mongodb is already installed in local dont need to use docker just makesure its running on this url 
>>mongodb://localhost:27017

after that just go to server directory
>>cd server

install node modules 
>>npm install

after install just run command
>>npm run dev

if want to start servere with JS dist run 
>>npm run build:run

now import postman collection and environment
just makesure empty access_token is added in environment if not just add that key please
now start testing 
signup, login, me, jock, logout

practical-test directory contains Test.pdf question
made 3 functions lessoptimized to optimized approach read comments above functions to understand
