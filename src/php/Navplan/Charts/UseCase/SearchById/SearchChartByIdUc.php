<?php declare(strict_types=1);

namespace Navplan\Charts\UseCase\SearchById;

use Navplan\Charts\DomainModel\AdChart;
use Navplan\Charts\DomainService\IChartRepo;


class SearchChartByIdUc implements ISearchChartByIdUc {
    public function __construct(private IChartRepo $chartRepo) {
    }


    public function search(int $id): AdChart {
        return $this->chartRepo->getAdChartById($id);
    }
}
