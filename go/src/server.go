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

type quizAttempted struct {
	UserName string `json:"UserName"`
	QuizID   string `json:"QuizID"`
	Score    string `json:"Score"`
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
	db.AutoMigrate(&quizAttempted{})

	r := gin.Default()
	r.POST("/signup", register)
	r.POST("/signin", signIn)
	r.POST("/SubmitQuiz/:QuizId/:Username/:Score", addAttemptedQuiz)
	r.GET("/user/:id", dashboard)
	r.POST("/AddQuestion", addQuestion)
	r.GET("/All_Quizes/:username", getAll)
	r.GET("/QuizQues/:id", fetchQuiz)
	r.GET("/GetGenres", getGenres)
	r.GET("/FetchLeaderBoard/:genre", fetchLeaderBoard)
	r.Run()

}

func fetchLeaderBoard(c *gin.Context) {
	fmt.Println(c.Params)
	c.Header("access-control-allow-origin", "*")

	//var q []quizAttempted

	//var l []leader

	type leader struct {
		UserName string `json:"username"`
		Score    string `json:"score"`
	}
	var l []leader

	if c.Params.ByName("genre") == "all" {
		rows, err := db.Raw("select distinct(user_name), sum(score) from quiz_attempteds group by user_name order by sum(score)").Rows()
		fmt.Println(err)

		defer rows.Close()

		for rows.Next() {
			var name string
			var score string
			rows.Scan(&name, &score)
			var le leader
			le.UserName = name
			le.Score = score
			l = append(l, le)
		}

		fmt.Println(l)
	}

	fmt.Println(l)

	c.JSON(200, gin.H{
		"arr": l,
	})

	//fmt.Println(r)
}

func getGenres(c *gin.Context) {
	var q []quiz
	db.Select("distinct(genre)").Find(&q)

	fmt.Println(q)

	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"genres": q,
	})
}

func addAttemptedQuiz(c *gin.Context) {
	fmt.Println(c.Params)

	username := c.Param("Username")
	quizID := c.Params.ByName("QuizId")
	score := c.Params.ByName("Score")

	var u user
	db.Where("username = ?", username).First(&u)

	var q quizAttempted
	q.QuizID = quizID
	q.Score = score
	q.UserName = username

	if db.Where("user_name = ? AND quiz_id = ?", username, quizID).First(&q).RecordNotFound() {
		db.Create(&q)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"Hola": "holo",
		})
	}

	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"user": q,
	})
}

func fetchQuiz(c *gin.Context) {
	fmt.Println(c.Params.ByName("id"))

	quizID := c.Params.ByName("id")

	var q quiz

	db.Where("id = ?", quizID).First(&q)
	//fmt.Println(q.Name)

	var ques []question

	db.Where("quiz_name = ?", q.Name).Find(&ques)

	//fmt.Println(ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"question_arr": ques,
	})
}

func getAll(c *gin.Context) {
	var q []quiz
	username := c.Params.ByName("username")

	var u user

	db.Where("username = ?", username).Find(&u)

	var givenQuizes []quizAttempted

	db.Where("user_name = ?", username).Find(&givenQuizes)

	//fmt.Println(givenQuizes)

	//fmt.Println(u)

	if err := db.Find(&q).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(q)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"quizes":    q,
			"attempted": givenQuizes,
		})
	}
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
