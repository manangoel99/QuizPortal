package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type user struct {
	ID        uint   `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	IsAdmin   bool   `json:"isadmin"`
}

type question struct {
	ID          uint   `json:"id"`
	QuizName    string `json:"quizname"`
	Quest       string `json:"question"`
	Option1text string `json:"option1text"`
	Option2text string `json:"option2text"`
	Option3text string `json:"option3text"`
	Option4text string `json:"option4text"`
	Option1ans  bool   `json:"option1ans"`
	Option2ans  bool   `json:"option2ans"`
	Option3ans  bool   `json:"option3ans"`
	Option4ans  bool   `json:"option4ans"`
	QuestionNum uint   `json:"question_number"`
	Genre       string `json:"genre"`
}

type quiz struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
}

type loginuser struct {
	Username string `json:"SignInUsername"`
	Password string `json:"SignInPassword"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&user{})
	db.AutoMigrate(&question{})
	db.AutoMigrate(&quiz{})

	r := gin.Default()
	r.POST("/signup", register)
	r.POST("/signin", signIn)
	r.GET("/user/:id", dashboard)
	r.POST("/AddQuestion", addQuestion)
	r.Run()

}

func addQuestion(c *gin.Context) {
	var q question

	c.BindJSON(&q)

	var qu quiz

	qu.Name = q.QuizName
	qu.Genre = q.Genre

	if db.Where("name = ?", q.QuizName).First(&qu).RecordNotFound() {
		db.Create(&qu)
	} else {
		c.AbortWithStatus(404)
		fmt.Println("Record Exists")
	}

	//if err := db.Where("Name = ?", q.QuizName).First(&qu).Error; err != nil {
	//	db.Create(&qu)
	//}

	//u := db.Where("quizname = ?", q.QuizName).First(&q)
	//fmt.Println(u.Value)

	db.Create(&q)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, q)
}

func dashboard(c *gin.Context) {
	c.JSON(200, gin.H{
		"Ping": "pong",
	})
}

func signIn(c *gin.Context) {
	var u user

	var lu loginuser

	c.BindJSON(&lu)

	username := lu.Username
	password := lu.Password

	if err := db.Where("Username = ? and Password = ?", username, password).First(&u).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(u)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"user": u,
		})
	}
}

func register(c *gin.Context) {
	var u user
	c.BindJSON(&u)
	if u.Username == "manan" {
		u.IsAdmin = true
	}

	db.Create(&u)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, u)
}
