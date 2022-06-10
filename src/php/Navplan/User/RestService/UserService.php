<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use Navplan\ProdNavplanDiContainer;

include_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

UserServiceProcessor::processRequest($diContainer);
