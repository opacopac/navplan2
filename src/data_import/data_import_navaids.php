<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Shared/DbService.php";
include_once __DIR__ . "/../php/Navplan/Shared/LoggingService.php";
include_once __DIR__ . "/../php/Navplan/Shared/GeoService.php";

use Navplan\Shared\DbService;
use Navplan\Shared\LoggingService;
use Navplan\Shared\GeoService;


const MAX_ZOOM = 14;

$conn = DbService::openDb();

// clear table
$query = "TRUNCATE openaip_navaids2";
DbService::execCUDQuery($conn, $query);


// importing navaid data
$data_dir = realpath("./openaip_navaids/");
$dir_entries = scandir($data_dir);

// iterate trough files
foreach ($dir_entries as $filename) {
    $abs_filename = $data_dir . "/" . $filename;

    // skip directories
    if (is_dir($abs_filename))
        continue;

    LoggingService::echoLineToBrowser("processing file '" . $abs_filename . "'...");
    $navaid_file = simplexml_load_file($abs_filename);
    $navaidCount = 0;
    foreach ($navaid_file->NAVAIDS->NAVAID as $navaid)
    {
        $navaidCount++;
        if ($navaidCount % 1000 == 0) {
            LoggingService::echoLineToBrowser($navaidCount . " navaids...");
        }

        $longitude = $navaid->GEOLOCATION->LON;
        $latitude = $navaid->GEOLOCATION->LAT;
        $geohash = GeoService::calcGeoHash($longitude, $latitude, MAX_ZOOM);


        $query = "INSERT INTO openaip_navaids2 (type, country, name, kuerzel, latitude, longitude, elevation, frequency, declination, truenorth, geohash, lonlat) VALUES (";
        $query .= " '" . $navaid['TYPE'] . "',";
        $query .= " '" . $navaid->COUNTRY . "',";
        $query .= " '" . mysqli_real_escape_string($conn, $navaid->NAME) . "',";
        $query .= " '" . $navaid->ID . "',";
        $query .= " '" . $latitude . "',";
        $query .= " '" . $longitude . "',";
        $query .= " '" . $navaid->GEOLOCATION->ELEV . "',";
        $query .= " '" . $navaid->RADIO->FREQUENCY . "',";
        $query .= " '" . $navaid->PARAMS->DECLINATION . "',";
        $query .= " '" . $navaid->ALIGNEDTOTRUENORTH->ELEV . "',";
        $query .= " '" . $geohash . "',";
        $query .= " GeomFromText('POINT(" . $longitude . " " . $latitude . ")')";
        $query .= ")";

        DbService::execCUDQuery($conn, $query);
    }

    LoggingService::echoLineToBrowser($navaidCount . " navaids.");
}

LoggingService::echoLineToBrowser("done.");
