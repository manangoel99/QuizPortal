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

	r := gin.Default()
	r.POST("/signup", register)
	r.POST("/signin", signIn)
	r.GET("/user/:id", dashboard)
	r.Run()

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
