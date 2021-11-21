<?php declare(strict_types=1);

namespace Navplan\Track\DomainModel;

use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;


class Track {
    /**
     * @param int $id
     * @param string $name
     * @param Position4d[] $positionList
     * @param Timestamp $saveTime
     */
    public function __construct(
        public int $id,
        public string $name,
        public array $positionList,
        public Timestamp $saveTime
    ) {
    }
}
