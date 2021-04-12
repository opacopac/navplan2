<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use NavplanTest\ProdNavplanDiContainer;

include_once __DIR__ . "/../../RestServiceBootstrap.php";


$config = new ProdNavplanDiContainer();
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

UserServiceProcessor::processRequest($postArgs, $config);
