<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Service;

use Navplan\Aerodrome\Domain\Model\ReportingPoint;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;


interface IReportingPointService {
    /**
     * @param Extent2d $extent
     * @return ReportingPoint[]
     */
    function searchByExtent(Extent2d $extent): array;

    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return ReportingPoint[]
     */
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;

    /**
     * @param string $searchText
     * @param int $maxResults
     * @return ReportingPoint[]
     */
    function searchByText(string $searchText, int $maxResults): array;

    /**
     * @param array $icaoList
     * @return ReportingPoint[]
     */
    function searchByIcao(array $icaoList): array;
}
