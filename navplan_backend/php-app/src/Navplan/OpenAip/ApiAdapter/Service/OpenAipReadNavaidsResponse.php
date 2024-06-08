<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\Navaid\Domain\Model\Navaid;


class OpenAipReadNavaidsResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param int $totalPages
     * @param int $totalCount
     * @param Navaid[] $items
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
