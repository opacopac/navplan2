<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\Airspace\Domain\Model\Airspace;


class OpenAipReadAirspacesResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param int $totalPages
     * @param int $totalCount
     * @param Airspace[] $items
     */
    public function __construct(
        public int $page,
        public int $nextPage,
        public int $totalPages,
        public int $totalCount,
        public array $items
    ) {
    }
}
