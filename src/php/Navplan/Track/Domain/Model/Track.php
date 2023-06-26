<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Model;

use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;


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
