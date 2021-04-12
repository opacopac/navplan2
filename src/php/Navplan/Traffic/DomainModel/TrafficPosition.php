<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;

use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;


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
