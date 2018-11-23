<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


$conn = DbService::openDb();

SearchServiceProcessor::processRequest(
    $_GET,
    $conn);

$conn->close();
