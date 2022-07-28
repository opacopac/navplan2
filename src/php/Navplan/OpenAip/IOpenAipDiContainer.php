<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;


interface IOpenAipDiContainer {
    function getNotamConfigService(): IOpenAipConfigService;

    function getOpenAipImporter(): IOpenAipImporter;

    function getOpenAipApiService(): IOpenAipService;
}
