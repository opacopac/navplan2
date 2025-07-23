<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbDeleteCommandBuilder;


class MySqlDbDeleteCommandBuilder implements IDbDeleteCommandBuilder
{
    private string $deleteStr;

    private ?DbCond $where = null;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbDeleteCommandBuilder
    {
        return new MySqlDbDeleteCommandBuilder($dbService);
    }


    public function deleteFrom(DbTable|string $table): IDbDeleteCommandBuilder
    {
        $this->deleteStr = "DELETE FROM " . MySqlDbTableBuilder::buildTableName($table);

        return $this;
    }


    public function where(DbCond $cond): IDbDeleteCommandBuilder
    {
        $this->where = $cond;

        return $this;
    }


    public function whereEquals(DbCol|string $column, string|int|float|bool|null $value): IDbDeleteCommandBuilder
    {
        return $this->where(DbCondSimple::create($column, DbCondOp::EQ, $value));
    }


    public function build(): string
    {
        $whereStr = $this->where !== null
            ? MySqlDbCondBuilder::create($this->dbService)->condition($this->where)->build()
            : "";

        return $this->deleteStr . ($whereStr !== "" ? " WHERE " . $whereStr : "");
    }
}
