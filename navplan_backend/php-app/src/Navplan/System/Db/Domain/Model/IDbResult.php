<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;


interface IDbResult {
    public function getNumRows(): int;

    public function fetch_assoc(): ?array;
}
