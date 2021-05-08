<?php declare(strict_types=1);

namespace Navplan\Charts\UseCase\SearchById;

use Navplan\Charts\DomainModel\AdChart;


interface ISearchChartByIdUc {
    function search(int $id): AdChart;
}
