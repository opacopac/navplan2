<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Time;


class ReadTrafficRequest {
    public $extent;
    public $maxAge;
    public $sessionId;


    public function __construct(
        Extent $extent,
        Time $maxAge,
        int $sessionId
    ) {
        $this->extent = $extent;
        $this->maxAge = $maxAge;
        $this->sessionId = $sessionId;
    }
}
