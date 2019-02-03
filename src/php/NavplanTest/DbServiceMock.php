<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbResult;
use Navplan\Shared\IDbService;


class DbServiceMock implements IDbService {
    private $mockResult;


    private function getConnectionMockResult(): DbResultMock {
        return $this->mockResult;
    }


    public function setConnectionMockResult(DbResultMock $mockResult) {
        $this->mockResult = $mockResult;
    }


    public function init(string $db_host, string $db_user, string $db_pw, string $db_name) {
    }


    public function openDb(): DbConnection {
        return new DbConnectionMock($this->mockResult);
    }


    public function closeDb(): bool {
        return true;
    }


    public function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): DbResult {
        return $this->getConnectionMockResult();
    }


    public function execMultiResultQuery(string $query, string $errorMessage): DbResult {
        return $this->getConnectionMockResult();
    }


    public function execCUDQuery(string $query, string $errorMessage): bool {
        return true;
    }
}
