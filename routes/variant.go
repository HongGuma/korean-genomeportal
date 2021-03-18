package routes

import (
	"net/http"

	"../handlers"
	"github.com/labstack/echo"
)

func getVariant(c echo.Context) error {
	variantID := c.Param("variantID")
	return c.JSON(http.StatusOK, handlers.GetSingleVariant(variantID))
}
