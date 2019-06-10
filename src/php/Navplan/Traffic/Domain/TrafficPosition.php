<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;

use Navplan\Geometry\Domain\Position4d;
use Navplan\Geometry\Domain\Timestamp;


class TrafficPosition {
    public $position;
    public $source;
    public $method;
    public $receiver;
    public $receivedTimestamp;


    public function __construct(
        Position4d $position,
        int $source,
        int $method,
        string $receiver,
        Timestamp $receivedTimestamp
    ) {
        $this->position = $position;
        $this->source = $source;
        $this->method = $method;
        $this->receiver = $receiver;
        $this->receivedTimestamp = $receivedTimestamp;
    }
}
