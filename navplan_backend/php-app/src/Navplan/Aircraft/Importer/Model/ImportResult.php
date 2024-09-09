<?php declare(strict_types=1);

namespace Navplan\Aircraft\Importer\Model;


class ImportResult {
    public function __construct(
        public bool $isSuccess,
        public int $insertCount
    ) {
    }
}
