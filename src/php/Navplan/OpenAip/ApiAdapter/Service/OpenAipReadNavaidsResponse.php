<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\Enroute\DomainModel\Navaid;


class OpenAipReadNavaidsResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param Navaid[] $items
     */
    public function __construct(
        public int $page,
        public int $nextPage,
        public array $items
    ) {
    }
}
