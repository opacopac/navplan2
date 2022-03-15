<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use Navplan\ProdNavplanDiContainerImporter;

include_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

UserServiceProcessor::processRequest($diContainer);
