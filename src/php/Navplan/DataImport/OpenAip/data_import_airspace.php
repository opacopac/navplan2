<?php
include "../php/config.php";
include "../php/helper.php";

include_once __DIR__ . "/../php/Navplan/Db/MySqlDb/DbService.php";

use Navplan\System\DomainModel\DbException;
use Navplan\System\MySqlDb\DbService;


const START_NUM_CORR_ADD_ENTRIES = 999000000;

header('Content-type: text/html; charset=utf-8');

$conn = DbService::openDb();


// clear table
printLine("clearing old data...");

$query = "TRUNCATE TABLE openaip_airspace2";
DbService::execCUDQuery($conn, $query);

printLine("ok");


// reading correction table
printLine("reading correction table...");

$query = "SELECT * from airspace_corr";
$result = DbService::execMultiResultQuery($conn, $query);

$corrLines = [];

while ($rs = $result->fetch_array(MYSQLI_ASSOC))
{
    $corrLines[] = array(
        "id" => $rs["id"],
        "type" => $rs["type"],
        "aip_country" => $rs["aip_country"],
        "aip_cat" => $rs["aip_cat"],
        "aip_name" => $rs["aip_name"],
        "corr_cat" => $rs["corr_cat"],
        "corr_alt_top_reference" => $rs["corr_alt_top_reference"],
        "corr_alt_top_height" => $rs["corr_alt_top_height"],
        "corr_alt_top_unit" => $rs["corr_alt_top_unit"],
        "corr_alt_bottom_reference" => $rs["corr_alt_bottom_reference"],
        "corr_alt_bottom_height" => $rs["corr_alt_bottom_height"],
        "corr_alt_bottom_unit" => $rs["corr_alt_bottom_unit"],
        "corr_polygon" => $rs["corr_polygon"]
    );
}

printLine("ok");


// add additional entries from correction table
printLine("add additional entries from correction table...");

$counter = 0;
foreach ($corrLines as $corr)
{
    if ($corr["type"] != "ADD")
        continue;

    insertIntoDb(
        $corr["aip_cat"],
        START_NUM_CORR_ADD_ENTRIES + $counter,
        $corr["aip_country"],
        $corr["aip_name"],
        $corr["corr_alt_top_reference"],
        $corr["corr_alt_top_height"],
        $corr["corr_alt_top_unit"],
        $corr["corr_alt_bottom_reference"],
        $corr["corr_alt_bottom_height"],
        $corr["corr_alt_bottom_unit"],
        $corr["corr_polygon"]
    );

    $counter++;
}

printLine("ok");


// importing airspace data
printLine("importing airspace data...");

$data_dir = realpath("./openaip_airspace/");
$dir_entries = scandir($data_dir);

// iterate trough files
foreach ($dir_entries as $filename)
{
    $abs_filename = $data_dir . "/" . $filename;

    // skip directories
    if (is_dir($abs_filename))
        continue;

    printLine("processing file " . $abs_filename . "...");

    $data_file = simplexml_load_file($abs_filename);
    ob_flush();

    foreach ($data_file->AIRSPACES->ASP as $airspace)
    {
        // get values
        $category = $airspace['CATEGORY']->__toString();
        $aip_id = $airspace->ID->__toString();
        $country = $airspace->COUNTRY->__toString();
        $name = $airspace->NAME->__toString();
        $alt_top_reference = $airspace->ALTLIMIT_TOP['REFERENCE']->__toString();
        $alt_top_height = $airspace->ALTLIMIT_TOP->ALT->__toString();
        $alt_top_unit = $airspace->ALTLIMIT_TOP->ALT['UNIT']->__toString();
        $alt_bottom_reference = $airspace->ALTLIMIT_BOTTOM['REFERENCE']->__toString();
        $alt_bottom_height = $airspace->ALTLIMIT_BOTTOM->ALT->__toString();
        $alt_bottom_unit = $airspace->ALTLIMIT_BOTTOM->ALT['UNIT']->__toString();
        $polygon = $airspace->GEOMETRY->POLYGON->__toString();


        // check correction entries
        $hide = false;
        foreach ($corrLines as $corrLine)
        {
            if ($corrLine["type"] == 'ADD')
                continue;

            if ($country == $corrLine["aip_country"] && $category == $corrLine["aip_cat"] && $name == $corrLine["aip_name"])
            {
                // hide
                if ($corrLine["type"] == "HIDE")
                {
                    $hide = true;
                    break;
                }

                // corrections
                if ($corrLine["corr_cat"])
                    $category = $corrLine["corr_cat"];

                if ($corrLine["corr_alt_top_reference"])
                    $alt_top_reference = $corrLine["corr_alt_top_reference"];

                if ($corrLine["corr_alt_top_height"])
                    $alt_top_height = $corrLine["corr_alt_top_height"];

                if ($corrLine["corr_alt_top_unit"])
                    $alt_top_unit = $corrLine["corr_alt_top_unit"];

                if ($corrLine["corr_alt_bottom_reference"])
                    $alt_bottom_reference = $corrLine["corr_alt_bottom_reference"];

                if ($corrLine["corr_alt_bottom_height"])
                    $alt_bottom_height = $corrLine["corr_alt_bottom_height"];

                if ($corrLine["corr_alt_bottom_unit"])
                    $alt_bottom_unit = $corrLine["corr_alt_bottom_unit"];

                if ($corrLine["polygon"])
                    $polygon = $corrLine["polygon"];
            }
        }

        if ($hide)
            continue;

        // save to db
        insertIntoDb($category, $aip_id, $country, $name, $alt_top_reference, $alt_top_height, $alt_top_unit, $alt_bottom_reference, $alt_bottom_height, $alt_bottom_unit, $polygon);
    }

    printLine("ok");
}

printLine("finished.");


function insertIntoDb(
    string $category,
    int $aip_id,
    string $country,
    string $name,
    string $alt_top_reference,
    string $alt_top_height,
    string $alt_top_unit,
    string $alt_bottom_reference,
    string $alt_bottom_height,
    string $alt_bottom_unit,
    string $polygon)
{
    global $conn;

    $query = "INSERT INTO openaip_airspace2 (category, aip_id, country, name, alt_top_reference, alt_top_height, alt_top_unit, alt_bottom_reference, alt_bottom_height, alt_bottom_unit, polygon, extent) VALUES (";
    $query .= " '" . $category . "',";
    $query .= " '" . $aip_id . "',";
    $query .= " '" . $country . "',";
    $query .= " '" . mysqli_real_escape_string($conn->getMySqli(), $name) . "',";
    $query .= " '" . $alt_top_reference . "',";
    $query .= " '" . $alt_top_height . "',";
    $query .= " '" . $alt_top_unit . "',";
    $query .= " '" . $alt_bottom_reference . "',";
    $query .= " '" . $alt_bottom_height . "',";
    $query .= " '" . $alt_bottom_unit . "',";
    $query .= " '" . $polygon . "',";
    $query .= " GeomFromText('POLYGON((" . $polygon  . "))')";
    $query .= ")";

    try {
        DbService::execCUDQuery($conn, $query);
    } catch (DbException $ex) {
        printLine($ex->getMessage());
        printLine("skipped");
    }
}
