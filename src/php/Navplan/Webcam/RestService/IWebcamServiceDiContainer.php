<?php declare(strict_types=1);

namespace Navplan\Webcam\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\Webcam\DomainService\IWebcamRepo;


interface IWebcamServiceDiContainer {
    function getHttpService(): IHttpService;

    function getWebcamRepo(): IWebcamRepo;
}
