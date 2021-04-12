<?php declare(strict_types=1);

namespace Navplan\Traffic\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


interface ITrafficServiceDiContainer {
    function getHttpService(): IHttpService;

    function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc;

    function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc;

    function getReadOgnTrafficUc(): IReadOgnTrafficUc;

    function getReadTrafficDetailsUc(): IReadTrafficDetailsUc;
}
