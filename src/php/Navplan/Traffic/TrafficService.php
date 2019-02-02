<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Shared\DbService;

require_once __DIR__ . "/../NavplanHelper.php";


$conn = DbService::openDb();

TrafficServiceProcessor::processRequest(
    $_GET,
    $conn);

$conn->close();
