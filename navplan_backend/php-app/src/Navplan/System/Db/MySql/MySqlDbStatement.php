<?php declare(strict_types=1);

namespace Navplan\System\Db\MySql;

use mysqli_stmt;
use Navplan\System\Db\Domain\Model\DbException;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\ILoggingService;


class MySqlDbStatement implements IDbStatement
{
    public function __construct(
        private readonly mysqli_stmt $stmt,
        private readonly ILoggingService $loggingService
    )
    {
    }


    public function bind_param(string $types, mixed &...$vars): bool
    {
        return $this->stmt->bind_param($types, ...$vars);
    }


    /**
     * @throws DbException
     */
    public function execute(string $errorMessage = "error executing prepared statement"): bool
    {
        $result = $this->stmt->execute();
        if ($result === false) {
            $this->logAndThrowDbException($errorMessage, $this->stmt->error);
        }

        return true;
    }


    public function getInsertId(): int
    {
        return $this->stmt->insert_id;
    }


    /**
     * @throws DbException
     */
    private function logAndThrowDbException(string $message, string $dbError): void
    {
        $exception = new DbException($message, $dbError);

        $this->loggingService->error('DB Error: ' . $message . ' ' . $dbError);

        throw $exception;
    }
}
