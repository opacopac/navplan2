<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Db/MySqlDb/DbService.php";

use Navplan\System\MySqlDb\DbService;

$conn = DbService::openDb();

// clear table
$query = "TRUNCATE icao_aircraft_type";
DbService::execCUDQuery($conn, $query);


// importing airport data
$filename = "./icao_aircraft_types/icao_aircraft_types.json";
$abs_filename = realpath($filename);

// skip directories
if (!file_exists($abs_filename))
	die("input file not found: " . $filename);

$acTypeList = json_decode(file_get_contents($abs_filename), true);

foreach ($acTypeList as $entry) {
	$query = "INSERT INTO icao_aircraft_type (designator, model, manufacturer, ac_type, eng_type, eng_count, wtc) VALUES (";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $entry["Designator"]) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $entry["ModelFullName"]) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $entry["ManufacturerCode"]) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), substr($entry["Description"], 0, 1)) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), substr($entry["Description"], 2, 1)) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), substr($entry["Description"], 1, 1)) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $entry["WTC"]) . "'";
	$query .= ")";

	$result = DbService::execCUDQuery($conn, $query);
}

print "done.";
