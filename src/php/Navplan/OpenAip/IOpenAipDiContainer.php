<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;


interface IOpenAipDiContainer {
    function getOpenAipConfig(): IOpenAipConfig;

    function getOpenAipImporter(): IOpenAipImporter;

    function getOpenAipApiService(): IOpenAipService;
}
