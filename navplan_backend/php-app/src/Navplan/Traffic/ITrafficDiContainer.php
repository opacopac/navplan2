<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\Traffic\Domain\Service\IAdsbexService;
use Navplan\Traffic\Domain\Service\IOgnService;
use Navplan\Traffic\Domain\Service\ITrafficDetailRepo;
use Navplan\Traffic\Ogn\Service\IOgnListenerRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


interface ITrafficDiContainer {
    function getAdsbexConfig(): IAdsbexConfig;

    function getAdsbexRepo(): IAdsbexService;

    function getOgnRepo(): IOgnService;

    function getOgnListenerRepo(): IOgnListenerRepo;

    function getTrafficDetailRepo(): ITrafficDetailRepo;

    function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc;

    function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc;

    function getReadOgnTrafficUc(): IReadOgnTrafficUc;

    function getReadTrafficDetailsUc(): IReadTrafficDetailsUc;
}
