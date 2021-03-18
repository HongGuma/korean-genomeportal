package models

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Association struct {
	ClumpSNP           string
	IndexSNP           string
	Trait              string
	Index_Pval         float64
	ClumpedChr         string
	ClumpedPos         string
	ClumpedAlt         string
	ClumpedBeta        float64
	ClumpedSE          float64
	Clumped_l95        float64
	Clumped_u95        float64
	Clumped_Pval       float64
	Clumped_Annotation string
}

func SearchAssociatedTraits(collection *mongo.Collection, chr string, pos string) []bson.M {
	findResults, err := collection.Find(context.TODO(), bson.M{"clumpedchr": chr, "clumpedpos": pos})
	if err != nil {
		log.Fatal(err)
	}

	var fildResultsArray []bson.M
	if err = findResults.All(context.TODO(), &fildResultsArray); err != nil {
		log.Fatal(err)
	}
	return fildResultsArray
}

func AddAssociationToDB(collection *mongo.Collection) {
	fhAssociation, err := os.Open(FileAssociation)
	if err != nil {
		log.Fatal(err)
	}
	defer fhAssociation.Close()
	scanner := bufio.NewScanner(fhAssociation)
	buf := make([]byte, 0, 64*1024)
	scanner.Buffer(buf, 4096*1024)
	scanner.Scan()

	for scanner.Scan() {
		line := scanner.Text()
		line = strings.ReplaceAll(line, " ", "")
		tmp := strings.Split(line, "\t")
		fmt.Println(tmp[3])
		indexPval, err := strconv.ParseFloat(tmp[3], 64)
		checkErr(err)
		clumpedBeta, err := strconv.ParseFloat(tmp[7], 64)
		checkErr(err)
		clumpedSE, err := strconv.ParseFloat(tmp[8], 64)
		checkErr(err)
		clumped_l95, err := strconv.ParseFloat(tmp[9], 64)
		checkErr(err)
		clumped_u95, err := strconv.ParseFloat(tmp[10], 64)
		checkErr(err)
		clumpedPval, err := strconv.ParseFloat(tmp[11], 64)
		checkErr(err)
		association := Association{
			ClumpSNP:           tmp[0],
			IndexSNP:           tmp[1],
			Trait:              tmp[2],
			Index_Pval:         indexPval,
			ClumpedChr:         tmp[4],
			ClumpedPos:         tmp[5],
			ClumpedAlt:         tmp[6],
			ClumpedBeta:        clumpedBeta,
			ClumpedSE:          clumpedSE,
			Clumped_l95:        clumped_l95,
			Clumped_u95:        clumped_u95,
			Clumped_Pval:       clumpedPval,
			Clumped_Annotation: tmp[12],
		}
		insertResult, err := collection.InsertOne(context.TODO(), association)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Inserted document", insertResult.InsertedID)
	}
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
