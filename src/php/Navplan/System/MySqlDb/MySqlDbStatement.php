<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use mysqli_stmt;
use Navplan\System\DomainModel\IDbStatement;


class MySqlDbStatement implements IDbStatement {
    public function __construct(private mysqli_stmt $stmt) {
    }


    function bind_param(string $types, mixed &...$vars): bool {
        return $this->stmt->bind_param($types, ...$vars);
    }


    function execute(): bool {
        return $this->stmt->execute();
    }


    function getInsertId(): int {
        return $this->stmt->insert_id;
    }
}
