<?php declare(strict_types=1);

namespace NavplanTest\System\Db\Mock;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbCredentials;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbDeleteCommandBuilder;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;


class MockDbService implements IDbService
{
    private array $mockResultList = [];
    public array $queryList = [];
    public int $insertId = 12345;
    public MockDbStatement $mockDbStatement;
    public string $prepareStatementQuery = '';


    public function __construct()
    {
        $this->mockDbStatement = new MockDbStatement();
    }


    public function getAllQueriesString(string $separator = ' '): string
    {
        return join($separator, $this->queryList);
    }


    private function shiftMockResult($query): MockDbResult
    {
        if (!$this->mockResultList || count($this->mockResultList) === 0) {
            throw new InvalidArgumentException("no mock result available for query: " . $query);
        }

        $result = array_shift($this->mockResultList);
        return new MockDbResult($result);
    }


    public function pushMockResult(array $resultSet): void
    {
        $this->mockResultList[] = $resultSet;
    }


    public function init(string $db_host, string $db_user, string $db_pw, string $db_name)
    {
    }


    public function openDb()
    {
    }


    public function closeDb()
    {
    }


    public function escapeString(string $escapeString): string
    {
        return str_replace("'", "\\'", $escapeString);
    }


    public function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): IDbResult
    {
        $this->queryList[] = $query;
        return $this->shiftMockResult($query);
    }


    public function execMultiResultQuery(string $query, string $errorMessage): IDbResult
    {
        $this->queryList[] = $query;
        return $this->shiftMockResult($query);
    }


    public function execCUDQuery(string $query, string $errorMessage): bool
    {
        $this->queryList[] = $query;
        return true;
    }


    public function getInsertId(): int
    {
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
        $this->prepareStatementQuery = $query;
        return $this->mockDbStatement;
    }


    public function beginTransaction(): bool
    {
        // TODO: Implement beginTransaction() method.
    }


    public function commitTransaction(): bool
    {
        // TODO: Implement commitTransaction() method.
    }


    public function rollbackTransaction(): bool
    {
        // TODO: Implement rollbackTransaction() method.
    }


    function getQueryBuilder(): IDbQueryBuilder
    {
        // TODO: Implement getQueryBuilder() method.
    }


    function getInsertCommandBuilder(): IDbInsertCommandBuilder
    {
        // TODO: Implement getInsertCommandBuilder() method.
    }


    function getDeleteCommandBuilder(): IDbDeleteCommandBuilder
    {
        // TODO: Implement getDeleteCommandBuilder() method.
    }
}
