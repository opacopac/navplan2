<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use InvalidArgumentException;
use Navplan\System\Domain\Model\IDbResult;
use Navplan\System\Domain\Model\IDbStatement;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbCredentials;


class MockDbService implements IDbService {
    private array $mockResultList = [];
    public array $queryList = [];
    public int $insertId = 12345;


    public function getAllQueriesString(string $separator = ' '): string {
        return join($separator, $this->queryList);
    }


    private function shiftMockResult($query): MockDbResult {
        if (!$this->mockResultList || count($this->mockResultList) === 0) {
            throw new InvalidArgumentException("no mock result available for query: " . $query);
        }

        $result = array_shift($this->mockResultList);
        return new MockDbResult($result);
    }


    public function pushMockResult(array $resultSet) {
        array_push($this->mockResultList, $resultSet);
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
        array_push($this->queryList, $query);
        return $this->shiftMockResult($query);
    }


    public function execMultiResultQuery(string $query, string $errorMessage): IDbResult {
        array_push($this->queryList, $query);
        return $this->shiftMockResult($query);
    }


    public function execCUDQuery(string $query, string $errorMessage): bool {
        array_push($this->queryList, $query);
        return true;
    }


    public function getInsertId(): int {
        return $this->insertId;
    }

    function escapeAndQuoteString(string $escapeString): string
    {
        // TODO: Implement escapeAndQuoteString() method.
    }

    function escapeAndQuoteStringOrNull(?string $escapeString): string
    {
        // TODO: Implement escapeAndQuoteStringOrNull() method.
    }

    function init2(DbCredentials $credentials)
    {
        // TODO: Implement init2() method.
    }

    function prepareStatement(string $query): IDbStatement
    {
        // TODO: Implement prepareStatement() method.
    }
}
