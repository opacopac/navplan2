<?php
require_once __DIR__ . "/../User/User.php";
require_once __DIR__ . "/../helper.php";
require_once __DIR__ . "/../terrainHelper.php";
require_once __DIR__ . "/SearchItemAirport.php";
require_once __DIR__ . "/SearchItemNavaid.php";
require_once __DIR__ . "/SearchItemAirspace.php";
require_once __DIR__ . "/SearchItemReportingPoint.php";
require_once __DIR__ . "/SearchItemUserPoint.php";
require_once __DIR__ . "/SearchItemWebcam.php";
require_once __DIR__ . "/SearchItemGeoname.php";
require_once __DIR__ . "/SearchItemNotam.php";


class SearchItems {
    const AIRPORTS = 'airports';
    const NAVAIDS = 'navaids';
    const AIRSPACES = 'airspaces';
    const REPORTINGPOINTS = 'reportingpoints';
    const USERPOINTS = 'userpoints';
    const WEBCAMS = 'webcams';
    const GEONAMES = 'geonames';
    const NOTAMS = 'notams';
}


const MAX_TEXT_SEARCH_RESULTS = 25;
const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;
const MAX_POSITION_SEARCH_RESULTS = 80;
const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;
const MAX_EXTENT_SEARCH_RESULTS = 9999;
const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;

$conn = openDb();

switch($_GET["action"]) {
    case "searchByText":
        $searchResults = searchByText(
            $conn,
            checkSearchItems($_GET["searchItems"]),
            checkEscapeString($conn, $_GET["searchText"], 1, 100),
            User::getAuthenticatedEmailOrNull($_GET["token"])
        );
        break;
    case "searchByPosition":
        $searchResults = searchByPosition(
            $conn,
            checkSearchItems($_GET["searchItems"]),
            checkNumeric($_GET["lon"]),
            checkNumeric($_GET["lat"]),
            checkNumeric($_GET["rad"]),
            $_GET["minnotamtime"] ? checkNumeric($_GET["minnotamtime"]) : 0,
            $_GET["maxnotamtime"] ? checkNumeric($_GET["maxnotamtime"]) : 0,
            User::getAuthenticatedEmailOrNull($_GET["token"])
        );
        break;
    case "searchByExtent":
        $searchResults = searchByExtent(
            $conn,
            checkSearchItems($_GET["searchItems"]),
            checkNumeric($_GET["minlon"]),
            checkNumeric($_GET["minlat"]),
            checkNumeric($_GET["maxlon"]),
            checkNumeric($_GET["maxlat"]),
            checkNumeric($_GET["zoom"]),
            $_GET["minnotamtime"] ? checkNumeric($_GET["minnotamtime"]) : 0,
            $_GET["maxnotamtime"] ? checkNumeric($_GET["maxnotamtime"]) : 0,
            User::getAuthenticatedEmailOrNull($_GET["token"])
        );
        break;
    case "searchByIcao":
        $searchResults = searchByIcao(
            $conn,
            checkSearchItems($_GET["searchItems"]),
            checkIcaoList($_GET["icao"]),
            $_GET["minnotamtime"] ? checkNumeric($_GET["minnotamtime"]) : 0,
            $_GET["maxnotamtime"] ? checkNumeric($_GET["maxnotamtime"]) : 0
        );
        break;
    default:
        die("unknown action!");
}

// create jsonp response
header("Content-Type: application/json; charset=UTF-8");
echo checkAlphaNumeric($_GET["callback"], 1, 50) . "(";
echo json_encode($searchResults, JSON_NUMERIC_CHECK);
echo ")";

$conn->close();


function checkSearchItems($searchItemString) {
    if (!$searchItemString)
        die("search items not specified");

    $searchItems = explode(',', $searchItemString);
    foreach ($searchItems as $item) {
        checkAlphaNumeric($item, 1, 20);
    }

    return $searchItems;
}


function checkIcaoList($icaoString) {
    if (!$icaoString)
        die("icao list not specified");

    $icaoList = explode(",", $icaoString);
    foreach ($icaoList as $icao) {
        checkAlphaNumeric($icao, 4, 4);
    }

    return $icaoList;
}


function searchByText($conn, $searchItems, $searchText, $email = null)
{
    $resultNum = 0;
    $airports = [];
    $navaids = [];
    $reportingPoints = [];
    $userPoints = [];
    $geonames = [];

    foreach ($searchItems as $searchItem) {
        if ($resultNum >= MAX_TEXT_SEARCH_RESULTS)
            break;

        switch ($searchItem) {
            case SearchItems::AIRPORTS:
                $airports = SearchItemAirport::searchByText($conn, $searchText, getMaxTextResults($resultNum), $email);
                $resultNum += count($airports);
                break;
            case SearchItems::NAVAIDS:
                $navaids = SearchItemNavaid::searchByText($conn, $searchText, getMaxTextResults($resultNum));
                $resultNum += count($navaids);
                break;
            case SearchItems::REPORTINGPOINTS:
                $reportingPoints = SearchItemReportingPoint::searchByText($conn, $searchText, getMaxTextResults($resultNum));
                $resultNum += count($reportingPoints);
                break;
            case SearchItems::USERPOINTS:
                $userPoints = SearchItemUserPoint::searchByText($conn, $searchText, getMaxTextResults($resultNum), $email);
                $resultNum += count($userPoints);
                break;
            case SearchItems::GEONAMES:
                $geonames = SearchItemGeoname::searchByText($conn, $searchText, getMaxTextResults($resultNum));
                $resultNum += count($geonames);
                break;
        }
    }


    return array(
        SearchItems::AIRPORTS => $airports,
        SearchItems::NAVAIDS => $navaids,
        SearchItems::AIRSPACES => [],
        SearchItems::REPORTINGPOINTS => $reportingPoints,
        SearchItems::USERPOINTS => $userPoints,
        SearchItems::WEBCAMS => [],
        SearchItems::GEONAMES => $geonames,
        SearchItems::NOTAMS => []
    );
}


function searchByPosition($conn, $searchItems, $lon, $lat, $maxRadius_deg, $minNotamTimestamp, $maxNotamTimestamp, $email = null) {
    $resultNum = 0;
    $airports = [];
    $navaids = [];
    $reportingPoints = [];
    $userPoints = [];
    $geonames = [];
    $notams = [];

    foreach ($searchItems as $searchItem) {
        if ($resultNum >= MAX_TEXT_SEARCH_RESULTS)
            break;

        switch ($searchItem) {
            case SearchItems::AIRPORTS:
                $airports = SearchItemAirport::searchByPosition($conn, $lon, $lat, $maxRadius_deg, getMaxPositionResults($resultNum), $email);
                $resultNum += count($airports);
                break;
            case SearchItems::NAVAIDS:
                $navaids = SearchItemNavaid::searchByPosition($conn, $lon, $lat, $maxRadius_deg, getMaxPositionResults($resultNum));
                $resultNum += count($navaids);
                break;
            case SearchItems::REPORTINGPOINTS:
                $reportingPoints = SearchItemReportingPoint::searchByPosition($conn, $lon, $lat, $maxRadius_deg, getMaxPositionResults($resultNum));
                $resultNum += count($reportingPoints);
                break;
            case SearchItems::USERPOINTS:
                $userPoints = SearchItemUserPoint::searchByPosition($conn, $lon, $lat, $maxRadius_deg, getMaxPositionResults($resultNum), $email);
                $resultNum += count($userPoints);
                break;
            case SearchItems::GEONAMES:
                $geonames = SearchItemGeoname::searchByPosition($conn, $lon, $lat, $maxRadius_deg, getMaxPositionResults($resultNum));
                $resultNum += count($geonames);
                break;
            case SearchItems::NOTAMS:
                $geonames = SearchItemNotam::searchByPosition($conn, $lon, $lat, $minNotamTimestamp, $maxNotamTimestamp, getMaxPositionResults($resultNum));
                $resultNum += count($geonames);
                break;
        }
    }


    return array(
        SearchItems::AIRPORTS => $airports,
        SearchItems::NAVAIDS => $navaids,
        SearchItems::AIRSPACES => [],
        SearchItems::REPORTINGPOINTS => $reportingPoints,
        SearchItems::USERPOINTS => $userPoints,
        SearchItems::WEBCAMS => [],
        SearchItems::GEONAMES => $geonames,
        SearchItems::NOTAMS => $notams
    );
}


function searchByExtent($conn, $searchItems, $minLon, $minLat, $maxLon, $maxLat, $zoom, $minnotamtime, $maxnotamtime, $email = null)
{
    $resultNum = 0;
    $airports = [];
    $navaids = [];
    $airspaces = [];
    $reportingPoints = [];
    $userPoints = [];
    $webcams = [];
    $notams = [];

    foreach ($searchItems as $searchItem) {
        if ($resultNum >= MAX_EXTENT_SEARCH_RESULTS)
            break;

        switch ($searchItem) {
            case SearchItems::AIRPORTS:
                $airports = SearchItemAirport::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email, $zoom);
                $resultNum += count($airports);
                break;
            case SearchItems::NAVAIDS:
                $navaids = SearchItemNavaid::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                $resultNum += count($navaids);
                break;
            case SearchItems::AIRSPACES:
                $airspaces = SearchItemAirspace::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                $resultNum += count($airspaces);
                break;
            case SearchItems::REPORTINGPOINTS:
                $reportingPoints = SearchItemReportingPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
                $resultNum += count($reportingPoints);
                break;
            case SearchItems::USERPOINTS:
                $userPoints = SearchItemUserPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email);
                $resultNum += count($userPoints);
                break;
            case SearchItems::WEBCAMS:
                $webcams = SearchItemWebcam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
                $resultNum += count($webcams);
                break;
            case SearchItems::NOTAMS:
                $notams = SearchItemNotam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom, $minnotamtime, $maxnotamtime);
                $resultNum += count($notams);
                break;
        }
    }


    // return output
    return array(
        SearchItems::AIRPORTS => $airports,
        SearchItems::NAVAIDS => $navaids,
        SearchItems::AIRSPACES => $airspaces,
        SearchItems::REPORTINGPOINTS => $reportingPoints,
        SearchItems::USERPOINTS => $userPoints,
        SearchItems::WEBCAMS => $webcams,
        SearchItems::GEONAMES => [],
        SearchItems::NOTAMS => $notams
    );
}


function searchByIcao($conn, $searchItems, $icaoList, $minnotamtime, $maxnotamtime)
{
    $airports = [];
    $reportingPoints = [];
    $webcams = [];
    $notams = [];

    foreach ($searchItems as $searchItem) {
        switch ($searchItem) {
            case SearchItems::AIRPORTS:
                $airports = SearchItemAirport::searchByIcao($conn, $icaoList, $minnotamtime, $maxnotamtime);
                break;
            case SearchItems::REPORTINGPOINTS:
                $reportingPoints = SearchItemReportingPoint::searchByIcao($conn, $icaoList, $minnotamtime, $maxnotamtime);
                break;
            case SearchItems::WEBCAMS:
                $webcams = SearchItemWebcam::searchByIcao($conn, $icaoList, $minnotamtime, $maxnotamtime);
                break;
            case SearchItems::NOTAMS:
                $notams = SearchItemNotam::searchByIcao($conn, $icaoList, $minnotamtime, $maxnotamtime);
                break;
        }
    }


    // return output
    return array(
        SearchItems::AIRPORTS => $airports,
        SearchItems::NAVAIDS => [],
        SearchItems::AIRSPACES => [],
        SearchItems::REPORTINGPOINTS => $reportingPoints,
        SearchItems::USERPOINTS =>[],
        SearchItems::WEBCAMS => $webcams,
        SearchItems::GEONAMES => [],
        SearchItems::NOTAMS => $notams
    );
}


function getMaxTextResults($resultNum) {
    return max(min(MAX_TEXT_SEARCH_RESULTS - $resultNum, MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
}


function getMaxPositionResults($resultNum) {
    return max(min(MAX_POSITION_SEARCH_RESULTS - $resultNum, MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
}


function getMaxExtentResults($resultNum) {
    return max(min(MAX_EXTENT_SEARCH_RESULTS - $resultNum, MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY), 0);
}
