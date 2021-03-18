package models

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Gene struct {
	Variants []Variant
}
type Variant struct {
	VariantID       string
	Chr             string
	Pos             string
	Ref             string
	Alt             string
	Variant_Type    string
	RSID            string
	VariantClass    string
	GeneSymbol      string
	AlleleCount     string
	AlleleFrequency string
}

func CountVariants(collection *mongo.Collection) bson.M {
	findResults, err := collection.Distinct(context.TODO(), "variantid", bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	return bson.M{"countVariants": len(findResults)}
}

func CountGenes(collection *mongo.Collection) bson.M {
	findResults, err := collection.Distinct(context.TODO(), "genesymbol", bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	return bson.M{"countGenes": len(findResults)}
}

func SearchGeneList(collection *mongo.Collection) []bson.M {
	findResults, err := collection.Distinct(context.TODO(), "genesymbol", bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	var geneSymbols []bson.M
	for _, gene := range findResults {
		geneSymbols = append(geneSymbols, bson.M{"geneSymbol": gene})
	}
	return geneSymbols
}
func SearchVariants(collection *mongo.Collection, geneSymbol string) []bson.M {

	findResults, err := collection.Find(context.TODO(), bson.M{"genesymbol": geneSymbol})
	if err != nil {
		log.Fatal(err)
	}

	var fildResultsArray []bson.M
	if err = findResults.All(context.TODO(), &fildResultsArray); err != nil {
		log.Fatal(err)
	}
	return fildResultsArray
}
func AddVariantsToDB(collection *mongo.Collection) {

	fhVariant, err := os.Open(FileVariant)
	if err != nil {
		log.Fatal(err)
	}
	defer fhVariant.Close()
	scanner := bufio.NewScanner(fhVariant)
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 4096*1024)
	scanner.Scan()
	for scanner.Scan() {
		line := scanner.Text()
		tmp := strings.Split(line, "\t")
		variant := Variant{
			VariantID:       tmp[0] + "-" + tmp[1] + "-" + tmp[2] + "-" + tmp[3],
			Chr:             tmp[0],
			Pos:             tmp[1],
			Ref:             tmp[2],
			Alt:             tmp[3],
			Variant_Type:    tmp[19],
			RSID:            tmp[21],
			VariantClass:    tmp[18],
			GeneSymbol:      tmp[26],
			AlleleCount:     tmp[9],
			AlleleFrequency: tmp[10],
		}

		insertResult, err := collection.InsertOne(context.TODO(), variant)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Inserted document: ", insertResult.InsertedID)
	}
}
