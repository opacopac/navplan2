<?php
ini_set('max_execution_time', 600);

include_once __DIR__ . "/../php/Navplan/Db/MySqlDb/DbService.php";

use Navplan\System\Db\MySql\DbService;

$conn = DbService::openDb();

// clear table
$query = "TRUNCATE icao_telephony_designator";
DbService::execCUDQuery($conn, $query);


// importing airport data
$filename = "./icao_telephony_designators/icao_telephony_designators.json";
$abs_filename = realpath($filename);

// skip directories
if (!file_exists($abs_filename))
	die("input file not found: " . $filename);

$telDesignators = json_decode(file_get_contents($abs_filename), true);

foreach ($telDesignators as $designator => $telephony) {
	$query = "INSERT INTO icao_telephony_designator (designator, telephony) VALUES (";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $designator) . "',";
	$query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $telephony) . "'";
	$query .= ")";

	$result = DbService::execCUDQuery($conn, $query);
}

print "done.";
