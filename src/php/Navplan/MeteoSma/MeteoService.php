<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;
use Navplan\MeteoSma\Rest\MeteoServiceProcessor;


$config = new NavplanConfigProd();
$processor = new MeteoServiceProcessor($config);
$processor->processRequest($_GET);
