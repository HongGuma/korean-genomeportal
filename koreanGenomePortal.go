package main

import (
	"context"
	"fmt"
	"log"

	"./models"
	"./routes"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:1323"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	//MongoDB connect
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	models.CollectionVariant = client.Database(models.NameDB).Collection(models.NameCollectionVariant)
	models.CollectionAssociation = client.Database(models.NameDB).Collection(models.NameCollectionAssociation)

	defer func() {
		err = client.Disconnect(context.TODO())

		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Connection to MongoDB closed.")

	}()

	// Route => handler
	routes.AssignRoutes(e)
	//Make List Route
	routes.ListRoutes(e)
	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
