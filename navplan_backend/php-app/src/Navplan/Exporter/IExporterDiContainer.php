<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Common\Rest\Controller\IRestController;


interface IExporterDiContainer {
    function getExportController(): IRestController;
}
