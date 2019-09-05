<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;


class TableVersion {
    private $master;
    private $local;


    // region GETTER

    public function getMaster(): int {
        return $this->master;
    }


    public function getLocal(): int {
        return $this->local;
    }

    // endregion


    public function __construct(
        int $master,
        int $local
    ) {
        $this->master = $master;
        $this->local = $local;
    }
}
