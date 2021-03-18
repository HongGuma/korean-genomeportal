package handlers

import (
	"../models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetCountVariants() bson.M {
	return models.CountVariants(models.CollectionVariant)
}

func GetCountGenes() bson.M {
	return models.CountGenes(models.CollectionVariant)
}

func GetGeneList() []bson.M {
	return models.SearchGeneList(models.CollectionVariant)
}

func GetVariantsInGene(geneSymbol string) []bson.M {
	return models.SearchVariants(models.CollectionVariant, geneSymbol)
}
func AddVariantToDB() {
	models.AddVariantsToDB(models.CollectionVariant)
}
