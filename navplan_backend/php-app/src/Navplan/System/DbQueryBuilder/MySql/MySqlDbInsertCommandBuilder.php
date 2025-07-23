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
     * @var DbCol[]
     */
    private array $columns = [];
    /**
     * @var string[]
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


    public function columns(DbCol ...$columns): IDbInsertCommandBuilder
    {
        $this->columns = $columns;

        return $this;
    }


    public function values(string ...$values): IDbInsertCommandBuilder
    {
        $this->values = $values;

        return $this;
    }


    public function build(): string
    {
        if (empty($this->columns) || empty($this->values) || count($this->columns) !== count($this->values)) {
            throw new InvalidArgumentException("Columns and values must be set and have the same number of entries before building the insert command.");
        }

        $columnsStr = join(", ", array_map(fn(DbCol $col) => $col->getName(), $this->columns));

        $valuesStr = join(", ", array_map(fn(string $value) => DbHelper::getDbStringValue($this->dbService, $value), $this->values));

        return $this->insertIntoStr . " (" . $columnsStr . ") VALUES (" . $valuesStr . ")";
    }
}
