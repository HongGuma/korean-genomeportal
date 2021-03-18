package models

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SearchSingleVariant(collection *mongo.Collection, variantID string) []bson.M {

	findResults, err := collection.Find(context.TODO(), bson.M{"variantid": variantID})
	if err != nil {
		log.Fatal(err)
	}

	var fildResultsArray []bson.M
	if err = findResults.All(context.TODO(), &fildResultsArray); err != nil {
		log.Fatal(err)
	}
	return fildResultsArray
}
