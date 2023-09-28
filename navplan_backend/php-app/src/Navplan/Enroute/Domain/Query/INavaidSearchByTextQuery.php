<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Enroute\Domain\Model\Navaid;


interface INavaidSearchByTextQuery {
    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Navaid[]
     */
    function searchByText(string $searchText, int $maxResults): array;
}
