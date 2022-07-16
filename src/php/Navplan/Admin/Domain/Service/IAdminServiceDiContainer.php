<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Service;

use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\System\DomainService\IHttpService;


interface IAdminServiceDiContainer {
    function getHttpService(): IHttpService;

    function getOpenAipImporter(): IOpenAipImporter;

    function getAdminService(): IAdminService;
}
