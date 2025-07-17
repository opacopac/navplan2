<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use Navplan\System\Domain\Model\DbSortDirection;
use Navplan\System\Domain\Service\IDbQueryBuilder;
use Navplan\System\Domain\Service\IDbService;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $query = "";


    public function __construct(private readonly IDbService $dbService)
    {
    }


    public function selectAllFrom(string $tableName): IDbQueryBuilder
    {
        $this->query .= "SELECT * FROM " . $tableName . " ";

        return $this;
    }


    public function whereEquals(string $colName, string|int|float $value): IDbQueryBuilder
    {
        $valueStr = is_string($value) ? "'" . $this->dbService->escapeString($value) . "'" : $value;

        $this->query .= "WHERE " . $colName . " = " . $valueStr . "' ";

        return $this;
    }


    public function orderBy(string $colName, DbSortDirection $direction): IDbQueryBuilder
    {
        $dirStr = $direction === DbSortDirection::ASC ? "ASC" : "DESC";
        $this->query .= "ORDER BY " . $colName . " " . $dirStr . " ";

        return $this;
    }


    public function build(): string
    {
        return $this->query;
    }
}
