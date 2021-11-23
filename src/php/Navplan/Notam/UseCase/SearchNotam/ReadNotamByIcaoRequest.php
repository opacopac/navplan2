<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;


class ReadNotamByIcaoRequest {
    public function __construct(
        public string $airportIcao,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }
}
