<?php
include_once __DIR__ . "/config.php";
include_once __DIR__ . "/helper.php";
include_once __DIR__ . "/search/SearchItemNavaid.php";
include_once __DIR__ . "/search/SearchItemAirport.php";
include_once __DIR__ . "/search/SearchItemAirspace.php";
include_once __DIR__ . "/search/SearchItemWebcam.php";
include_once __DIR__ . "/search/SearchItemReportingPoint.php";
include_once __DIR__ . "/search/SearchItemUserPoint.php";


// open db connection
$conn = openDb();

// read/check input parameters
$minLat = checkNumeric($_GET["minlat"]);
$maxLat = checkNumeric($_GET["maxlat"]);
$minLon = checkNumeric($_GET["minlon"]);
$maxLon = checkNumeric($_GET["maxlon"]);
$email = $_GET["email"] ? checkEscapeEmail($conn, $_GET["email"]) : NULL;
$token = $_GET["token"] ? checkEscapeToken($conn, $_GET["token"]) : NULL;
$callback = checkAlphaNumeric($_GET["callback"], 1, 50);

// load data
$navaids = SearchItemNavaid::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$airports = SearchItemAirport::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email);
$airspaces = SearchItemAirspace::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$webcams = SearchItemWebcam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$reportingPoints = SearchItemReportingPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
$userPoints = SearchItemUserPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email, $token);

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
