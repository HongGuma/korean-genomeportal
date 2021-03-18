package models

import (
	"go.mongodb.org/mongo-driver/mongo"
)

//CONST
var NameDB = "myportal2"
var NameCollectionVariant = "variants"
var NameCollectionAssociation = "associations"
var FileVariant = "Chunk.20200710.txt"
var FileAssociation = "Associated.txt"

var CollectionVariant *mongo.Collection
var CollectionAssociation *mongo.Collection
