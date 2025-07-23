<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


class MySqlDbInsertCommandBuilder implements IDbInsertCommandBuilder
{
    private string $insertIntoStr;
    /**
     * @var DbCol|string[]
     */
    private array $columns = [];
    /**
     * @var float|bool|int|string|null[]
     */
    private array $values = [];


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbInsertCommandBuilder
    {
        return new MySqlDbInsertCommandBuilder($dbService);
    }


    public function insertInto(DbTable|string $table): IDbInsertCommandBuilder
    {
        $this->insertIntoStr = "INSERT INTO " . MySqlDbTableBuilder::buildTableNameWithoutAlias($table);

        return $this;
    }


    function setValue(string|DbCol $column, float|bool|int|string|null $value): IDbInsertCommandBuilder
    {
        $this->columns[] = $column;
        $this->values[] = $value;

        return $this;
    }


    public function build(): string
    {
        if (empty($this->columns) || empty($this->values) || count($this->columns) !== count($this->values)) {
            throw new InvalidArgumentException("Columns and values must be set and have the same number of entries before building the insert command.");
        }

        $columnsStr = join(", ", array_map(
            fn(DbCol|string $col) => MySqlDbColBuilder::buildColNameWithoutAlias($col),
            $this->columns
        ));

        $valuesStr = join(", ", array_map(
            fn(string $value) => DbHelper::getDbStringValue($this->dbService, $value), // TODO
            $this->values
        ));

        return $this->insertIntoStr . " (" . $columnsStr . ") VALUES (" . $valuesStr . ")";
    }
}
