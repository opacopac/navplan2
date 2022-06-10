<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\System\DomainService\IHttpService;


interface IMeteoDwdServiceDiContainer {
    function getHttpService(): IHttpService;

    function getMeteoDwdService(): IMeteoDwdService;
}
