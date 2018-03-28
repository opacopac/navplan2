<?php
include_once __DIR__ . "/config.php";
include_once __DIR__ . "/helper.php";
include_once __DIR__ . "/search/SearchItemNavaid.php";
include_once __DIR__ . "/search/SearchItemAirport.php";
include_once __DIR__ . "/search/SearchItemAirspace.php";
include_once __DIR__ . "/search/SearchItemWebcam.php";
include_once __DIR__ . "/search/SearchItemReportingPoint.php";
include_once __DIR__ . "/search/SearchItemUserPoint.php";


//const NUM_PIXEL_HEIGHT = 1280; // TODO: temp
const NUM_PIXEL_TILE_WIDTH = 256;

// open db connection
$conn = openDb();

// read/check input parameters
$minLat = checkNumeric($_GET["minlat"]);
$maxLat = checkNumeric($_GET["maxlat"]);
$minLon = checkNumeric($_GET["minlon"]);
$maxLon = checkNumeric($_GET["maxlon"]);
$zoom = checkNumeric($_GET["zoom"]);
$email = $_GET["email"] ? checkEscapeEmail($conn, $_GET["email"]) : NULL;
$token = $_GET["token"] ? checkEscapeToken($conn, $_GET["token"]) : NULL;
$callback = checkAlphaNumeric($_GET["callback"], 1, 50);

//$pixelResolutionDeg = ($maxLat - $minLat) / NUM_PIXEL_HEIGHT;
$pixelResolutionDeg = 360.0 / (NUM_PIXEL_TILE_WIDTH * pow(2, $zoom));


// load data
$navaids = [];
$navaids = SearchItemNavaid::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
$airports = [];
$airports = SearchItemAirport::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email, $zoom);
$airspaces = [];
$airspaces = SearchItemAirspace::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
$webcams = []; // SearchItemWebcam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$reportingPoints = []; // SearchItemReportingPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$userPoints = []; // SearchItemUserPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email, $token);

// close db
$conn->close();

// return output
$return_object = json_encode(
    array(
        "navaids" => $navaids,
        "airports" => $airports,
        "airspaces" => $airspaces,
        "reportingPoints" => $reportingPoints,
        "userPoints" => $userPoints,
        "webcams" => $webcams),
    JSON_NUMERIC_CHECK);


header("Content-Type: application/json; charset=UTF-8");

// create jsonp response
echo $callback . "(";
echo $return_object;
echo ")";
