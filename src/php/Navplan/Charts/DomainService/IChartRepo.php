<?php declare(strict_types=1);

namespace Navplan\Charts\DomainService;

use Navplan\Charts\DomainModel\AdChart;


interface IChartRepo {
    function getAdChartsByIcao(string $airportIcao): array;

    function getAdChartById(int $id): AdChart;
}
