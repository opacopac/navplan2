<?php declare(strict_types=1);

namespace NavplanTest;

use InvalidArgumentException;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class DbServiceMock implements IDbService {
    private $mockResultList = [];
    public $lastQuery = NULL;
    public $lastQueryList = [];


    private function shiftMockResult($query): DbResultMock {
        if (!$this->mockResultList || count($this->mockResultList) === 0) {
            throw new InvalidArgumentException("no mock result available for query: " . $query);
        }

        $result = array_shift($this->mockResultList);
        return new DbResultMock($result);
    }


    public function pushMockResult(array $mockResultRows) {
        array_push($this->mockResultList, $mockResultRows);
    }


    public function init(string $db_host, string $db_user, string $db_pw, string $db_name) {
    }


    public function openDb() {
    }


    public function closeDb() {
    }


    public function escapeString(string $escapeString): string {
        return str_replace("'", "\\'", $escapeString);
    }


    public function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): IDbResult {
        $this->lastQuery = $query;
        array_push($this->lastQueryList, $query);
        return $this->shiftMockResult($query);
    }


    public function execMultiResultQuery(string $query, string $errorMessage): IDbResult {
        $this->lastQuery = $query;
        array_push($this->lastQueryList, $query);
        return $this->shiftMockResult($query);
    }


    public function execCUDQuery(string $query, string $errorMessage): bool {
        $this->lastQuery = $query;
        array_push($this->lastQueryList, $query);
        return true;
    }

    public function getInsertId(): int {
        return 12345;
    }
}
