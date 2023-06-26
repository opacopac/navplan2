<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;

use Navplan\Common\DomainModel\Position3d;


class OgnTrafficMessage {
    public function __construct(
        public string $address,
        public string $addressType,
        public string $acType,
        public int $timestamp,
        public Position3d $position,
        public string $receiver
    ) {
    }
}
