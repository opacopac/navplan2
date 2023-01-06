<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$diContainer->getMeteoDwdDiContainer()->getMeteoDwdController()->processRequest();
