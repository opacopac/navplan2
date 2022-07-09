<?php declare(strict_types=1);

namespace Navplan\Admin\Rest\Service;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AdminServiceController::processRequest($diContainer);
