package routes

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/labstack/echo"
)

func genes(e *echo.Echo) {
	e.GET("/genelist", getGeneList)
	e.GET("/gene", addGene)
	e.GET("/gene/:id", getGene)
	e.GET("/genecount", getCountGenes)
	e.GET("/variantcount", getCountVariants)
}

func variants(e *echo.Echo) {
	//e.GET("/genelist", getGeneList)
	//e.GET("/gene", addGene)
	e.GET("/variant/:variantID", getVariant)
}

func association(e *echo.Echo) {
	e.GET("/association", addAssociation)
	e.GET("/association/:variantInfo", getAssociatedTraits)
}

func AssignRoutes(e *echo.Echo) {
	genes(e)
	variants(e)
	association(e)
	e.GET("/test", test)
}

func ListRoutes(e *echo.Echo) {
	data, err := json.MarshalIndent(e.Routes(), "", "  ")
	if err != nil {
		log.Fatalln(err)
	}
	ioutil.WriteFile("routes.json", data, 0644)
}
