<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use mysqli_stmt;
use Navplan\System\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\ILoggingService;


class MySqlDbStatement implements IDbStatement {
    public function __construct(
        private mysqli_stmt $stmt,
        private ILoggingService $loggingService
    ) {
    }


    public function bind_param(string $types, mixed &...$vars): bool {
        return $this->stmt->bind_param($types, ...$vars);
    }


    public function execute(): bool {
        return $this->stmt->execute();
    }


    public function getInsertId(): int {
        return $this->stmt->insert_id;
    }
}
