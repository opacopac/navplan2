<?php declare(strict_types=1);

namespace Navplan\Charts\UseCase\SearchByIcao;

use Navplan\Charts\DomainService\IChartRepo;


class SearchChartByIcaoUc implements ISearchChartByIcaoUc {
    public function __construct(private IChartRepo $chartRepo) {
    }


    public function search(string $airportIcao): array {
        return $this->chartRepo->getAdChartsByIcao($airportIcao);
    }
}
