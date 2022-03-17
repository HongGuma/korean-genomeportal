package routes

import (
	"net/http"
	"strings"

	"../handlers"
	"github.com/labstack/echo"
)

func getAssociatedTraits(c echo.Context) error {
	variantInfo := c.Param("variantInfo")
	tmp := strings.Split(variantInfo, "-")
	chr := tmp[0]
	pos := tmp[1]
	return c.JSON(http.StatusOK, handlers.GetAssociatedTraits(chr, pos))
}

func addAssociation(c echo.Context) error {
	handlers.AddAssociationToDB()
	return c.String(http.StatusOK, "HI")
}
