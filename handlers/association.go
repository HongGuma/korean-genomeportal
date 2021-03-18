package handlers

import (
	"../models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAssociatedTraits(chr string, pos string) []bson.M {
	return models.SearchAssociatedTraits(models.CollectionAssociation, chr, pos)
}

func AddAssociationToDB() {
	models.AddAssociationToDB(models.CollectionAssociation)
}
