<?php declare(strict_types=1);

namespace Navplan\Navaid\Domain\Query;

use Navplan\Navaid\Domain\Model\Navaid;


interface INavaidSearchByTextQuery {
    /**
     * @param string $searchText
     * @param int $maxResults
     * @return Navaid[]
     */
    function searchByText(string $searchText, int $maxResults): array;
}
