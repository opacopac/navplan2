<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;

interface IDbStatement {
    function bind_param(string $types, mixed &...$vars): bool;

    /**
     * @throws DbException
     */
    function execute(string $errorMessage): bool;

    function getInsertId(): int;
}
