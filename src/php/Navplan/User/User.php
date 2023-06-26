<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\ProdNavplanDiContainer;
use Navplan\User\Rest\Service\UserController;

include_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

UserController::processRequest(
    $diContainer->getUserDiContainer()->getLoginUc(),
    $diContainer->getUserDiContainer()->getAutoLoginUc(),
    $diContainer->getUserDiContainer()->getSendRegisterEmailUc(),
    $diContainer->getUserDiContainer()->getRegisterUc(),
    $diContainer->getUserDiContainer()->getSendLostPwUc(),
    $diContainer->getUserDiContainer()->getResetPwUc(),
    $diContainer->getUserDiContainer()->getUpdatePwUc(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
