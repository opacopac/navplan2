<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Service;

use Navplan\Aerodrome\Domain\Model\AirportChart;
use Navplan\Aerodrome\Domain\Model\AirportChart2;


interface IAirportChartService {
    /**
     * @param string $airportIcao
     * @return AirportChart[]
     */
    function getAdChartsByIcao(string $airportIcao): array;

    function getAdChartById(int $id): AirportChart;

    /**
     * @param string $airportIcao
     * @return AirportChart2[]
     */
    function getAdCharts2ByIcao(string $airportIcao): array;

    function getAdChart2ById(int $id): AirportChart2;
}
