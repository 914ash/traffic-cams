Finding open-source government ArcGIS layers (Feature Services) can be done efficiently using specific Google "dorks" or search operators. These target the **ArcGIS REST Services Directory**, which is the standard web interface for Esri servers.

### 1. Recommended Search Queries (Google Dorks)

Copy and paste these into Google to find live directories:

* **Broad search for all government feature services:**
`site:.gov "FeatureServer" inurl:arcgis/rest/services`
* **Search for military-specific data:**
`site:.mil "FeatureServer" inurl:arcgis/rest/services`
* **Find the "Root" directories (which let you browse all available folders/layers):**
`intitle:"ArcGIS REST Services Directory" site:.gov`
* **Search for specific themes (e.g., Environment, Transportation):**
`site:.gov inurl:arcgis/rest/services "FeatureServer" "transportation"`

---

### 2. High-Value Government ArcGIS Roots

Many federal and state agencies host massive repositories. Here are some major "Roots" where you can find hundreds of layers:

| Agency | Root URL (REST Directory) |
| --- | --- |
| **US Geological Survey (USGS)** | `https://energy.usgs.gov/arcgis/rest/services/` |
| **Dept. of Transportation (DOT)** | `https://geo.dot.gov/server/rest/services/` |
| **Army Corps of Engineers** | `https://geospatial.sec.usace.army.mil/server/rest/services/` |
| **National Map (USGS)** | `https://basemap.nationalmap.gov/arcgis/rest/services/` |
| **NOAA (Imagery/Marine)** | `https://imagery.geoplatform.gov/iipp/rest/services/` |
| **California State GIS** | `https://gis.water.ca.gov/arcgis/rest/services/` |

---

### 3. How to use the URL format

When you find a service you like, the structure usually follows this logic:
`https://[Root URL]/[Folder]/[ServiceName]/FeatureServer/[LayerIndex]`

* **To browse everything:** Stop at `/rest/services/`.
* **To see all layers in a service:** Stop at `/FeatureServer`.
* **To query data from a specific layer:** Use `/FeatureServer/0` (where 0 is the layer ID).

### 4. Pro-Tip: Finding "Hidden" Data

If a government site has a "Map Gallery" but doesn't link to the raw data, look at the network traffic in your browser (F12 > Network tab) while the map loads. Filter for "query" or "arcgis" to find the underlying `FeatureServer` URL they are using to power the map.