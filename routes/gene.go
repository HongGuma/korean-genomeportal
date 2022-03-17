package routes

import (
	"net/http"

	"../handlers"
	"github.com/labstack/echo"
)

func getCountVariants(c echo.Context) error {

	return c.JSON(http.StatusOK, handlers.GetCountVariants())
}

func getCountGenes(c echo.Context) error {

	return c.JSON(http.StatusOK, handlers.GetCountGenes())
}

func getGeneList(c echo.Context) error {
	return c.JSON(http.StatusOK, handlers.GetGeneList())
}

func addGene(c echo.Context) error {
	handlers.AddVariantToDB()
	return c.String(http.StatusOK, "HI")
}

func getGene(c echo.Context) error {
	id := c.Param("id")
	return c.JSON(http.StatusOK, handlers.GetVariantsInGene(id))
}
