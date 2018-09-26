*Welcome To The Quiz App !*
==========================
*Made By :* ***Manan Goel***

-------------
***About The Game***
------------
This Quizzing Web App is a part of my SSAD Course. It is a quizzing platform where the adminsitrator can make his/her own quizzes and the users can attempt them. 
This was made taking reference from [QuizUp](https://www.quizup.com/en)

---------------------------
***Rules***
* Only the admin can **Make**, **Edit** Quizzes and Users.
* Users can **Register** and **Attempt** quizzes from different genres.
* There are leaderboards including a general leaderboard and also genre specific leaderboards.
* Each User can attempt a quiz **only once**.
----------------------------
***Inner Working***
* The front end is done in ***React.JS*** using Material-UI
* The back end is using a ***REST API*** written in Go Lang using ***GORM*** for database mantainence and ***GIN*** for taking care of requests.

------------------------------
***Installation Instructions***
* Clone The Repo
    ```
    git clone https://github.com/manangoel99/QuizPortal.git
    cd QuizPortal
    ```
* Run Back End server
    * Install Go Lang on your system and then run the following commands
    ```
    cd go
    go get -u -v github.com/gin-gonic/gin
    go get -u -v github.com/jinzhu/gorm
    go get -u -v github.com/jinzhu/gorm/dialects/sqlite
    ```
* Run React Server
    * Intsall Yarn before running the app
    ```
    npm install -g create-react-app
    cd react-app
    yarn install
    yarn start
    ```

------------------------------
***Manan Goel***
***20171102***