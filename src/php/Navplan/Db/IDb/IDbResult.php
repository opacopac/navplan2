<?php declare(strict_types=1);

namespace Navplan\Db\IDb;


interface IDbResult {
    public function getNumRows(): int;

    public function fetch_assoc(): ?array;
}
