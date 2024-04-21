<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;


class OpenAipImportFilter {
    public function __construct(
        public ?string $country = null
    ) {
    }
}
