<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Model;


class MetarTafResponse {
    /**
     * @param array $data Raw METAR/TAF data array from Aviation Weather API
     */
    public function __construct(
        public array $data
    ) {
    }
}
