<?php declare(strict_types=1);

namespace Navplan\Admin\Domain\Model;


class ImportResponse {
    public function __construct(
        public bool $isSuccess,
        public int $insertCount
    ) {
    }
}
