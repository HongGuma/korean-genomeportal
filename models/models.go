package models

import (
	"go.mongodb.org/mongo-driver/mongo"
)

//CONST
var NameDB = "korean_genome_portal"
var NameCollectionVariant = "variants"
var NameCollectionAssociation = "associations"
var FileVariant = "Chunk.20200710.txt"
var FileAssociation = "Combined.AddNARD.FilterAC.txt"

var CollectionVariant *mongo.Collection
var CollectionAssociation *mongo.Collection
