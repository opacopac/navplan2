<?php declare(strict_types=1);

namespace Navplan\Webcam\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

WebcamServiceProcessor::processRequest($diContainer);
