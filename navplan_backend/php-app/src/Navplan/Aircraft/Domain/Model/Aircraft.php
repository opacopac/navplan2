<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


class Aircraft
{
    public function __construct(
        public int $id,
        public string $registration,
        public string $type
    )
    {
    }
}
