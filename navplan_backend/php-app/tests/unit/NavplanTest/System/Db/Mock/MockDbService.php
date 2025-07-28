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


    public function init(DbCredentials $credentials): void
    {
    }


    public function openDb(): void
    {
    }


    public function closeDb(): void
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
        throw new InvalidArgumentException("not implemented");
    }


    function escapeAndQuoteStringOrNull(?string $escapeString): string
    {
        throw new InvalidArgumentException("not implemented");
    }


    function prepareStatement(string $query): IDbStatement
    {
        $this->prepareStatementQuery = $query;
        return $this->mockDbStatement;
    }


    public function beginTransaction(): bool
    {
        throw new InvalidArgumentException("not implemented");
    }


    public function commitTransaction(): bool
    {
        throw new InvalidArgumentException("not implemented");
    }


    public function rollbackTransaction(): bool
    {
        throw new InvalidArgumentException("not implemented");
    }


    function getQueryBuilder(): IDbQueryBuilder
    {
        throw new InvalidArgumentException("not implemented");
    }


    function getInsertCommandBuilder(): IDbInsertCommandBuilder
    {
        throw new InvalidArgumentException("not implemented");
    }


    function getDeleteCommandBuilder(): IDbDeleteCommandBuilder
    {
        throw new InvalidArgumentException("not implemented");
    }
}
