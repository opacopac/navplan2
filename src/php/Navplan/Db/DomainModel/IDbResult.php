<?php declare(strict_types=1);

namespace Navplan\Db\DomainModel;


interface IDbResult {
    public function getNumRows(): int;

    public function fetch_assoc(): ?array;
}
