<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;

use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;


class TrafficPosition {
    public $source;


    public function __construct(
        public Position4d $position,
        public int $method,
        public string $receiver,
        public Timestamp $receivedTimestamp
    ) {
    }
}
