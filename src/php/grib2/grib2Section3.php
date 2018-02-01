<?php
require_once "grib2Base.php";


// Grid Definition Section
class Grib2Section3 extends Grib2SectionVariableLength {
    public $sectionNumber;
    public $source;
    public $numDataPoints;
    public $numBytesNumberPointsList;
    public $numberPointsListInterpretation;
    public $gridDefTemplateNumber;
    public $gridDefTemplate;


    protected function parse($content) {
        $byteArray = unpack("C1a/C1b/N1c/C1d/C1e/n1f/a*g", $content);
        $this->sectionNumber = $byteArray["a"];
        $this->source = new Grib2Table3_0($byteArray["b"]);
        $this->numDataPoints = $byteArray["c"];
        $this->numBytesNumberPointsList = $byteArray["d"];
        $this->numberPointsListInterpretation = new Grib2Table3_11($byteArray["e"]);
        $this->gridDefTemplateNumber = new Grib2Table3_1($byteArray["f"]);

        switch ($this->gridDefTemplateNumber->value) {
            case 0:
                $this->gridDefTemplate = new Grib2Template3_0($byteArray["g"]);
                break;
            case 1:
                $this->gridDefTemplate = new Grib2Template3_1($byteArray["g"]);
        }
    }


    public function getDescription() {
        return array (
            "Section" => $this->sectionNumber . " (Grid Definition Section)",
            "Source" => $this->source->value . ": " . $this->source->getDescription(),
            "Number of data points" => $this->numDataPoints,
            "Octets defining number of points list" => $this->numBytesNumberPointsList,
            "Interpetation of number of points list " => $this->numberPointsListInterpretation->value . ": " . $this->numberPointsListInterpretation->getDescription(),
            "Grid definition template number" => $this->gridDefTemplateNumber->value . ": " . $this->gridDefTemplateNumber->getDescription(),
            "Grid definition template" => $this->gridDefTemplate->getDescription()
        );
    }
}


// GRID DEFINITION TEMPLATE 3.0
// Latitude/Longitude (or equidistant cylindrical, or Plate Carree)
class Grib2Template3_0 extends Grib2GridDefinitionTemplate {
    public $shapeOfEarth;
    public $sphericalEarthRadiusScaleFactor;
    public $sphericalEarthRadiusScaleValue;
    public $oblateSpheroidEarthMajorAxisScaleFactor;
    public $oblateSpheroidEarthMajorAxisScaleValue;
    public $oblateSpheroidEarthMinorAxisScaleFactor;
    public $oblateSpheroidEarthMinorAxisScaleValue;
    public $numPointsParallel;
    public $numPointsMeridian;
    public $basicAngle;
    public $basicAngleSubdivisions;
    public $firstGridPointLat;
    public $firstGridPointLon;
    public $resolutionComponentsFlags;
    public $lastGridPointLat;
    public $lastGridPointLon;
    public $iDirectionInc;
    public $jDirectionInc;
    public $scanningMode;


    protected function parse($content) {
        $byteArray = unpack("C1a/C1b/N1c/C1d/N1e/C1f/N1g/N1h/N1i/N1j/N1k/N1l/N1m/C1n/N1o/N1p/N1q/N1r/A1s", $content);
        $this->shapeOfEarth = new GribTable3_2($byteArray["a"]);
        $this->sphericalEarthRadiusScaleFactor = $byteArray["b"];
        $this->sphericalEarthRadiusScaleValue = $byteArray["c"];
        $this->oblateSpheroidEarthMajorAxisScaleFactor = $byteArray["d"];
        $this->oblateSpheroidEarthMajorAxisScaleValue = $byteArray["e"];
        $this->oblateSpheroidEarthMinorAxisScaleFactor = $byteArray["f"];
        $this->oblateSpheroidEarthMinorAxisScaleValue = $byteArray["g"];
        $this->numPointsParallel = $byteArray["h"];
        $this->numPointsMeridian = $byteArray["i"];
        $this->basicAngle = $byteArray["j"];
        $this->basicAngleSubdivisions = $byteArray["k"];
        $this->firstGridPointLat = $byteArray["l"];
        $this->firstGridPointLon = $byteArray["m"];
        $this->resolutionComponentsFlags = new GribTable3_3($byteArray["n"]);
        $this->lastGridPointLat = $byteArray["o"];
        $this->lastGridPointLon = $byteArray["p"];
        $this->iDirectionInc = $byteArray["q"];
        $this->jDirectionInc = $byteArray["r"];
        $this->scanningMode = new GribTable3_4($byteArray["s"]);
    }


    public function getDescription() {
        return array(
            "Shape of earth" => $this->shapeOfEarth->value . ": " . $this->shapeOfEarth->getDescription(),
            "Scale Factor / Value of radius of spherical Earth" => $this->sphericalEarthRadiusScaleFactor . "/" . $this->sphericalEarthRadiusScaleValue,
            "Scale factor / value of major axis of oblate spheroid Earth" => $this->oblateSpheroidEarthMajorAxisScaleFactor . "/" . $this->oblateSpheroidEarthMajorAxisScaleValue,
            "Scale factor / value of minor axis of oblate spheroid Earth" => $this->oblateSpheroidEarthMinorAxisScaleFactor . "/" . $this->oblateSpheroidEarthMinorAxisScaleValue,
            "Ni/Nj Number of points along parallel / meridian" => $this->numPointsParallel . "/" . $this->numPointsMeridian,
            "Basic angle / Subdivisions" => $this->basicAngle . "/" . $this->basicAngleSubdivisions,
            "Lat/Lon of first grid point" => $this->firstGridPointLat . "/" . $this->firstGridPointLon,
            "Resolution and component flags" => $this->resolutionComponentsFlags->getDescription(),
            "Lat/Lon of last grid point" => $this->lastGridPointLat . "/" . $this->lastGridPointLon,
            "i direction increment" => $this->iDirectionInc,
            "j direction increment" => $this->jDirectionInc,
            "Scanning mode" => $this->scanningMode->getDescription()
        );
    }


    public function getNumColumns() {
        return $this->numPointsParallel;
    }


    public function getNumRows() {
        return $this->numPointsMeridian;
    }


    public function getScanningMode() {
        return $this->scanningMode;
    }
}


// GRID DEFINITION TEMPLATE 3.1
// Rotate Latitude/Longitude (or equidistant cylindrical, or Plate Carree)
class Grib2Template3_1 extends Grib2GridDefinitionTemplate {
    public $shapeOfEarth;
    public $sphericalEarthRadiusScaleFactor;
    public $sphericalEarthRadiusScaleValue;
    public $oblateSpheroidEarthMajorAxisScaleFactor;
    public $oblateSpheroidEarthMajorAxisScaleValue;
    public $oblateSpheroidEarthMinorAxisScaleFactor;
    public $oblateSpheroidEarthMinorAxisScaleValue;
    public $numPointsParallel;
    public $numPointsMeridian;
    public $basicAngle;
    public $basicAngleSubdivisions;
    public $firstGridPointLat;
    public $firstGridPointLon;
    public $resolutionComponentsFlags;
    public $lastGridPointLat;
    public $lastGridPointLon;
    public $iDirectionInc;
    public $jDirectionInc;
    public $scanningMode;
    public $southernPoleLat;
    public $southernPoleLon;
    public $rotationAngle;


    protected function parse($content) {
        $byteArray = unpack("C1a/C1b/N1c/C1d/N1e/C1f/N1g/N1h/N1i/N1j/N1k/N1l/N1m/C1n/N1o/N1p/N1q/N1r/A1s/N1t/N1u/N1v", $content);
        $this->shapeOfEarth = new GribTable3_2($byteArray["a"]);
        $this->sphericalEarthRadiusScaleFactor = $byteArray["b"];
        $this->sphericalEarthRadiusScaleValue = $byteArray["c"];
        $this->oblateSpheroidEarthMajorAxisScaleFactor = $byteArray["d"];
        $this->oblateSpheroidEarthMajorAxisScaleValue = $byteArray["e"];
        $this->oblateSpheroidEarthMinorAxisScaleFactor = $byteArray["f"];
        $this->oblateSpheroidEarthMinorAxisScaleValue = $byteArray["g"];
        $this->numPointsParallel = $byteArray["h"];
        $this->numPointsMeridian = $byteArray["i"];
        $this->basicAngle = $byteArray["j"];
        $this->basicAngleSubdivisions = $byteArray["k"];
        $this->firstGridPointLat = $byteArray["l"];
        $this->firstGridPointLon = $byteArray["m"];
        $this->resolutionComponentsFlags = new GribTable3_3($byteArray["n"]);
        $this->lastGridPointLat = $byteArray["o"];
        $this->lastGridPointLon = $byteArray["p"];
        $this->iDirectionInc = $byteArray["q"];
        $this->jDirectionInc = $byteArray["r"];
        $this->scanningMode = new GribTable3_4($byteArray["s"]);
        $this->southernPoleLat = $byteArray["t"];
        $this->southernPoleLon = $byteArray["u"];
        $this->rotationAngle = $byteArray["v"];
    }


    public function getDescription() {
        return array(
            "Shape of earth" => $this->shapeOfEarth->value . ": " . $this->shapeOfEarth->getDescription(),
            "Scale Factor / Value of radius of spherical Earth" => $this->sphericalEarthRadiusScaleFactor . "/" . $this->sphericalEarthRadiusScaleValue,
            "Scale factor / value of major axis of oblate spheroid Earth" => $this->oblateSpheroidEarthMajorAxisScaleFactor . "/" . $this->oblateSpheroidEarthMajorAxisScaleValue,
            "Scale factor / value of minor axis of oblate spheroid Earth" => $this->oblateSpheroidEarthMinorAxisScaleFactor . "/" . $this->oblateSpheroidEarthMinorAxisScaleValue,
            "Ni/Nj Number of points along parallel / meridian" => $this->numPointsParallel . "/" . $this->numPointsMeridian,
            "Basic angle / Subdivisions" => $this->basicAngle . "/" . $this->basicAngleSubdivisions,
            "Lat/Lon of first grid point" => $this->firstGridPointLat . "/" . $this->firstGridPointLon,
            "Resolution and component flags" => $this->resolutionComponentsFlags->getDescription(),
            "Lat/Lon of last grid point" => $this->lastGridPointLat . "/" . $this->lastGridPointLon,
            "i direction increment" => $this->iDirectionInc,
            "j direction increment" => $this->jDirectionInc,
            "Scanning mode" => $this->scanningMode->getDescription(),
            "Lat/Lon of southern pole of projection" => $this->southernPoleLat . "/" . $this->southernPoleLon,
            "Rotation angle of projection" => $this->rotationAngle
        );
    }


    public function getNumColumns() {
        return $this->numPointsParallel;
    }


    public function getNumRows() {
        return $this->numPointsMeridian;
    }


    public function getScanningMode() {
        return $this->scanningMode;
    }
}


// GRIB2 - TABLE 3.0
// Source of Grid Definition
class Grib2Table3_0 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Specified in Code Table 3.1";
            case 1: return "Predetermined Grid Definition - Defined by Originating Center";
            case 255: return "A grid definition does not apply to this product.";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - TABLE 3.1
// Grid Definition Template Number
class Grib2Table3_1 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Latitude/Longitude (See Template 3.0) Also called Equidistant Cylindrical or Plate Caree";
            case 1: return "Rotated Latitude/Longitude (See Template 3.1)";
            case 65535: return "Missing";
        }

        if ($this->value >= 32768 && $this->value <= 65534)
            return "Reserved for Local Use";
        else
            return "ERROR: Not Implemented"; // TODO
    }
}


// GRIB2 - TABLE 3.2
// Shape of the Reference System
class GribTable3_2 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "Earth assumed spherical with radius = 6,367,470.0 m ";
            case 1: return "Earth assumed spherical with radius specified (in m) by data producer";
            case 2: return "Earth assumed oblate spheriod with size as determined by IAU in 1965 (major axis = 6,378,160.0 m, minor axis = 6,356,775.0 m, f = 1/297.0)";
            case 3: return "Earth assumed oblate spheriod with major and minor axes specified (in km) by data producer";
            case 4: return "Earth assumed oblate spheriod as defined in IAG-GRS80 model (major axis = 6,378,137.0 m, minor axis = 6,356,752.314 m, f = 1/298.257222101)";
            case 5: return "Earth assumed represented by WGS84 (as used by ICAO since 1998) (Uses IAG-GRS80 as a basis)";
            case 6: return "Earth assumed spherical with radius = 6,371,229.0 m";
            case 7: return "Earth assumed oblate spheroid with major and minor axes specified (in m) by data producer";
            case 8: return "Earth model assumed spherical with radius 6,371,200 m, but the horizontal datum of the resulting Latitude/Longitude field is the WGS84 reference frame";
            case 9: return "Earth represented by the OSGB 1936 Datum, using the Airy_1830 Spheroid, the Greenwich meridian as 0 Longitude, the Newlyn datum as mean sea level, 0 height.";
            case 255: return "Missing";
        }

        if ($this->value >= 192 && $this->value <= 254)
            return "Reserved for Local Use";
        else
            return "Reserved";
    }
}


// GRIB2 - TABLE 3.3
// RESOLUTION AND COMPONENT FLAGS
class GribTable3_3 extends Grib2Flags {
    // 0: i direction increments not given
    // 1: i direction increments given
    public function hasIDirectionIncrementsGiven() {
        return ($this->flags & 0x00100000b);
    }

    // 0: j direction increments not given
    // 1: j direction increments given
    public function hasJDirectionIncrementsGiven() {
        return !($this->flags & 0x00010000b);
    }

    // 0: Resolved u and v components of vector quantities relative to easterly and northerly directions
    // 1: Resolved u and v components of vector quantities relative to the defined grid in the direction of increasing x and y (or i and j) coordinates, respectively
    public function hasResolvedUVrelativeToEastNorthDir() {
        return !($this->flags & 0x00001000b);
    }


    public function getDescription() {
        return sprintf( "%08d", decbin($this->flags)); // TODO
    }
}


// GRIB2 - TABLE 3.4
// SCANNING MODE
class GribTable3_4 extends Grib2Flags
{
    // 0: Points in the first row or column scan in the +i (+x) direction
    // 1: Points in the first row or column scan in the -i (-x) direction
    // i direction - west to east along a parallel or left to right along an x-axis.
    public function hasIDirectionPositive() {
        return !($this->flags & 0x10000000b);
    }


    // 0: Points in the first row or column scan in the -j (-y) direction
    // 1: Points in the first row or column scan in the +j (+y) direction
    // j direction - south to north along a meridian, or bottom to top along a y-axis.
    public function hasJDirectionPositive() {
        return !($this->flags & 0x01000000b);
    }


    // 0: Adjacent points in the i (x) direction are consecutive
    // 1: Adjacent points in the j (y) direction are consecutive
    public function hasConsecutivePointsInIDirection() {
        return !($this->flags & 0x00100000b);
    }


    // 0: All rows scan in the same direction
    // 1: Adjacent rows scan in the opposite direction
    public function hasAllRowsInSameDirections() {
        return !($this->flags & 0x00010000b);
    }


    public function getDescription() {
        return sprintf( "%08d", decbin($this->flags)); // TODO
    }
}


// GRIB2 - TABLE 3.11
// Interpretation of list of numbers at end of section 3
class Grib2Table3_11 extends Grib2Table {
    public function getDescription() {
        switch ($this->value) {
            case 0: return "There is no appended list";
            case 1: return "Numbers define number of points corresponding to full coordinate circles (i.e. parallels).  Coordinate values on each circle are multiple of the circle mesh, and extreme coordinate values given in grid definition may not be reached in all rows.";
            case 2: return "Numbers define number of points corresponding to coordinate lines delimited by extreme coordinate values given in grid definition which are present in each row.";
            case 3: return "Numbers define the actual latitudes for each row in the grid. The list of numbers are integer values of the valid latitudes in microdegrees (scale by 106) or in unit equal to the ratio of the basic angle and the subdivisions number for each row, in the same order as specified in the \"scanning mode flag\" (bit no. 2) (see note 2)";
            case 255: return "Missing.";
            default: return "Reserved";
        }
    }
}
