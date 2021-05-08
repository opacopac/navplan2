<?php declare(strict_types=1);

namespace Navplan\Charts\UseCase\SearchByIcao;


interface ISearchChartByIcaoUc {
    function search(string $airportIcao): array;
}
