<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\OpenAip\Importer\Service\IOpenAipImporter;


interface IOpenAipDiContainer {
    function getOpenAipImporter(): IOpenAipImporter;
}


