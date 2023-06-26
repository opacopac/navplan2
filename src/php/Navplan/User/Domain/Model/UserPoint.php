<?php declare(strict_types=1);

namespace Navplan\User\Domain\Model;

use Navplan\Common\DomainModel\Position2d;


class UserPoint {
    public function __construct(
        public int $id,
        public string $type,
        public string $name,
        public Position2d $position,
        public ?string $remark,
        public ?string $supp_info
    ) {
    }
}
