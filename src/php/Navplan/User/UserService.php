<?php declare(strict_types=1);

namespace Navplan\User;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

UserServiceProcessor::processRequest($postArgs, $config);
