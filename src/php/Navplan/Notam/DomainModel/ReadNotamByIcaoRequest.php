<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;


class ReadNotamByIcaoRequest {
    public function __construct(
        public string $airportIcao,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }
}
