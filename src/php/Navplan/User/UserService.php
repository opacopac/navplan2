<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;
use Navplan\Shared\MailService;


header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD

$conn = DbService::openDb();

UserServiceProcessor::processRequest(
    json_decode(file_get_contents('php://input'), TRUE),
    $conn,
    MailService::getInstance());

$conn->close();
