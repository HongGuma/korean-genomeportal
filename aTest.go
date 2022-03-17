package main

import (
	"./models"
	"./routes"
	"../handlers"


)


func main(){
	handlers.AddAssociationToDB()
	fmt.Println("HI")
	handlers.AddVariantToDB()
}