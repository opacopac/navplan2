<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Shared/DbService.php";

use Navplan\Shared\DbService;

$conn = DbService::openDb();

// clear table
$query = "TRUNCATE basestation_aircrafts";
DbService::execCUDQuery($conn, $query);


// importing airport data
$filename = "./basestation/BaseStation_Aircrafts.csv";
$abs_filename = realpath($filename);

if (!file_exists($abs_filename))
    die("input file not found: " . $filename . "\n");

$file = fopen($abs_filename, "r");
$line = 0;
while (($values = fgetcsv($file,0, ";")) !== FALSE) {
    $line++;

    // skip first line & invalid lines
    if ($line <= 1 || count($values) !== 9) {
        continue;
    }

    list($ac_id, $mode_s, $mode_s_country, $country, $reg, $manufacturer, $icao_type, $model, $owner) = $values;

    $query = "INSERT INTO basestation_aircrafts (mode_s, country, registration, manufacturer, icao_type_code) VALUES (";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $mode_s) . "',";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $mode_s_country) . "',";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $reg) . "',";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $manufacturer) . "',";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $icao_type) . "'";
    $query .= ")";

    $result = DbService::execCUDQuery($conn, $query);

    if ($line % 1000 === 0) {
        print $line . " lines written\n";
    }
}

print "done.\n";
