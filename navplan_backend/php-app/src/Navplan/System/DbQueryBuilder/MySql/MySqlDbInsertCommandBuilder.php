<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;
use RuntimeException;


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


    public function build(bool $isPreparedStatement = false): string
    {
        $this->checkReadyForBuildOrThrow();

        $columnsStr = $this->buildColStr();
        $valuesStr = $this->buildValuesStr($isPreparedStatement);

        return $this->insertIntoStr . " (" . $columnsStr . ") VALUES (" . $valuesStr . ")";
    }


    public function buildBindParamTypes(): string
    {
        $this->checkReadyForBuildOrThrow();

        $types = array_map(
            fn(DbCol|string $col) => $col instanceof DbCol
                ? $this->getBindStatementType($col->getType())
                : "s", // TODO: handle string columns (e.g. based on value)
            $this->columns
        );

        return join("", $types);
    }


    private function buildColStr(): string
    {
        return join(", ", array_map(
            fn(DbCol|string $col) => MySqlDbColBuilder::buildColNameWithoutAlias($col),
            $this->columns
        ));
    }


    private function checkReadyForBuildOrThrow(): void
    {
        if (empty($this->insertIntoStr)) {
            throw new RuntimeException("Insert command must be initialized with insertInto() before building.");
        }

        if (empty($this->columns) || empty($this->values) || count($this->columns) !== count($this->values)) {
            throw new InvalidArgumentException("Columns and values must be set and have the same number of entries before building the insert command.");
        }
    }


    private function buildValuesStr(bool $isPreparedStatement = false): string
    {
        if ($isPreparedStatement) {
            return join(", ", array_fill(0, count($this->values), "?"));
        } else {
            return join(", ", array_map(
                fn(float|bool|int|string|null $value) => DbHelper::getDbStringValue($this->dbService, $value), // TODO: use proper type conversion
                $this->values
            ));
        }
    }


    private function getBindStatementType(DbColType $type): string
    {
        return match ($type) {
            DbColType::STRING,
            DbColType::TIMESTAMP,
            DbColType::GEOMETRY,
            DbColType::GEO_POINT => "s",
            DbColType::INT,
            DbColType::BOOL => "i",
            DbColType::DOUBLE => "d",
            default => throw new InvalidArgumentException("Unsupported column type: $type->name"),
        };
    }
}
