library(leaflet)
library(magrittr)

KopperlMap <- leaflet() %>%
  addTiles() %>%
  setView(-97.5,32.07, zoom=13)%>%
  addMarkers(-97.5,32.07,popup="Kopperl Area")
KopperlMap
library(htmlwidgets)
saveWidget(widget = KopperlMap, file = "KopperlMap1.html")

