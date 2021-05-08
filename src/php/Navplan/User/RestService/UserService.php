<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use Navplan\ProdNavplanDiContainerAirport;

include_once __DIR__ . "/../../RestServiceBootstrap.php";


$config = new ProdNavplanDiContainerAirport();
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

UserServiceProcessor::processRequest($postArgs, $config);
