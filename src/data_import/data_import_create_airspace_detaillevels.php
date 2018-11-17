<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Shared/GeoService.php";
include_once __DIR__ . "/../php/Navplan/Shared/DbService.php";
include_once __DIR__ . "/../php/Navplan/Shared/LoggingService.php";

use Navplan\Shared\DbService;
use Navplan\Shared\GeoService;
use Navplan\Shared\LoggingService;


const MIN_PIXEL_COORDINATE_RESOLUTION = 1.0;
const MIN_ZOOM = 0;
const MAX_ZOOM = 14;


$conn = DbService::openDb();

// truncate detaillevels
$query = "TRUNCATE openaip_airspace_detaillevels";
DbService::execCUDQuery($conn, $query);


$query  = "SELECT";
$query .= " id,";
$query .= " polygon,";
$query .= " ST_Distance(ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 1), ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 3)) AS diameter";
$query .= " FROM openaip_airspace2";
$result = DbService::execMultiResultQuery($conn, $query, "error reading airspaces");

$numAsProcessed = 0;
while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($numAsProcessed % 500 == 0) {
        LoggingService::echoLineToBrowser("processing " . $numAsProcessed . " airspaces...");
    }
    $numAsProcessed++;

    $id = $rs["id"];
    $diameter = $rs["diameter"];
    writeDistance($conn, $id, $diameter);

    $polygonOrig = GeoService::parsePolygonFromString($rs["polygon"], 4);
    $origPoints = count($polygonOrig);
    $lastPoints = null;
    $lastZoom = 0;

    /*print "<br><br>\n\n";
    print "polygon: " . $id . "<br>\n";*/
    for ($zoom = MIN_ZOOM; $zoom <= MAX_ZOOM; $zoom++) {
        $resolutionDeg = GeoService::calcDegPerPixelByZoom($zoom);
        $pixelResolutionDeg = $resolutionDeg * MIN_PIXEL_COORDINATE_RESOLUTION;
        $polygonSimple = GeoService::simplifyPolygon($polygonOrig, $pixelResolutionDeg);
        $points = count($polygonSimple);

        /*print "zoom: " . $zoom . "<br>\n";
        print "resolutionDeg: " . $resolutionDeg . "<br>\n";
        print "pixelresolutionDeg: " . $pixelResolutionDeg . "<br>\n";
        print "polygon points in: " . $origPoints . "<br>\n";
        print "polygon points out: " . $points . "<br>\n";*/

        if ($lastPoints != $points) {
            if ($lastPoints != null) {
                $polygonString = GeoService::joinPolygonToString($polygonSimple);
                writePolygonDetailLevel($conn, $id, $lastZoom, $zoom - 1, $polygonString);
            }
            $lastPoints = $points;
            $lastZoom = $zoom;
        }

        if ($zoom == MAX_ZOOM) {
            $polygonString = GeoService::joinPolygonToString($polygonSimple);
            writePolygonDetailLevel($conn, $id, $lastZoom, 255, $polygonString);
        }
    }
}

LoggingService::echoLineToBrowser("processing " . $numAsProcessed . " airspaces... done!");


$conn->close();


function writeDistance($conn, $id, $diameter) {
    $query =  "UPDATE openaip_airspace2";
    $query .= " SET diameter=" . $diameter;
    $query .= " WHERE id =" . $id;
    DbService::execCUDQuery($conn, $query);
}


function writePolygonDetailLevel($conn, $id, $minZoom, $maxZoom, $polygonString) {
    //print "   ==> WRITE " . $minZoom . "-" . $maxZoom . "<br>\n";

    $query =  "INSERT INTO openaip_airspace_detaillevels";
    $query .= " (airspace_id, zoommin, zoommax, polygon)";
    $query .= " VALUES ('" . $id . "','" . $minZoom . "','" . $maxZoom ."','" . $polygonString . "')";
    DbService::execCUDQuery($conn, $query);
}
