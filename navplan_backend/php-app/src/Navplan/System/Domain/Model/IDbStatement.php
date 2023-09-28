<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;

interface IDbStatement {
    function bind_param(string $types, mixed &...$vars): bool;

    function execute(): bool;

    function getInsertId(): int;
}
