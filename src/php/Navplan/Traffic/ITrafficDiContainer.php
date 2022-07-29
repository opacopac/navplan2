<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Traffic\AdsbexService\IAdsbexConfigService;
use Navplan\Traffic\DomainService\IAdsbexService;
use Navplan\Traffic\DomainService\IOgnService;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;
use Navplan\Traffic\OgnListenerService\IOgnListenerRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


interface ITrafficDiContainer {
    function getAdsbexConfigService(): IAdsbexConfigService;

    function getAdsbexRepo(): IAdsbexService;

    function getOgnRepo(): IOgnService;

    function getOgnListenerRepo(): IOgnListenerRepo;

    function getTrafficDetailRepo(): ITrafficDetailRepo;

    function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc;

    function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc;

    function getReadOgnTrafficUc(): IReadOgnTrafficUc;

    function getReadTrafficDetailsUc(): IReadTrafficDetailsUc;
}
