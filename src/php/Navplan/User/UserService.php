<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\ProdNavplanDiContainer;
use Navplan\User\RestService\UserServiceController;

include_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

UserServiceController::processRequest(
    $diContainer->getUserDiContainer(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
