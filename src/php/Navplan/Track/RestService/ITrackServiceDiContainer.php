<?php declare(strict_types=1);

namespace Navplan\Track\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\Track\DomainService\ITrackService;


interface ITrackServiceDiContainer {
    function getHttpService(): IHttpService;

    function getTrackService(): ITrackService;
}
