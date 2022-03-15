<?php declare(strict_types=1);

namespace Navplan\Track\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

TrackServiceProcessor::processRequest($diContainer);
