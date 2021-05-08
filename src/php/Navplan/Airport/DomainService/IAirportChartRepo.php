<?php declare(strict_types=1);

namespace Navplan\Airport\DomainService;

use Navplan\Airport\DomainModel\AirportChart;


interface IAirportChartRepo {
    function getAdChartsByIcao(string $airportIcao): array;

    function getAdChartById(int $id): AirportChart;
}
