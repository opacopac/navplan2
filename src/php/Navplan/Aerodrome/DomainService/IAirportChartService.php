<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainService;

use Navplan\Aerodrome\DomainModel\AirportChart;


interface IAirportChartService {
    function getAdChartsByIcao(string $airportIcao): array;

    function getAdChartById(int $id): AirportChart;
}
