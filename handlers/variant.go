package handlers

import (
	"../models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetSingleVariant(variantID string) []bson.M {
	return models.SearchSingleVariant(models.CollectionVariant, variantID)
}
