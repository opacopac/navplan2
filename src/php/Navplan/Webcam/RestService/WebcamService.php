<?php declare(strict_types=1);

namespace Navplan\Webcam\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

WebcamServiceProcessor::processRequest($diContainer);
