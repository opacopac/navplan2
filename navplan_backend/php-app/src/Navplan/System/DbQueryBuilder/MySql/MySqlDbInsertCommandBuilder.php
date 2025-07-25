<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Model\IDbStatement;
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
     * @var DbCol[]
     */
    private array $columns = [];
    private array $values = [];


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbInsertCommandBuilder
    {
        return new MySqlDbInsertCommandBuilder($dbService);
    }


    public function insertInto(DbTable $table): IDbInsertCommandBuilder
    {
        $this->insertIntoStr = "INSERT INTO " . MySqlDbTableBuilder::buildTableName($table, false);

        return $this;
    }


    function setValue(DbCol $column, mixed $value): IDbInsertCommandBuilder
    {
        $this->columns[] = $column;
        $this->values[] = $value;

        return $this;
    }


    public function getValues(): array
    {
        return $this->values;
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


    public function buildStatement(): IDbStatement
    {
        $query = $this->build(true);
        return $this->dbService->prepareStatement($query);
    }


    public function buildAndBindStatement(): IDbStatement
    {
        $statement = $this->buildStatement();
        $bindParamTypes = $this->buildBindParamTypes();
        $statement->bind_param($bindParamTypes, ...$this->getValues());

        return $statement;
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
        $valueStrs = [];

        for ($i = 0; $i < count($this->columns); $i++) {
            $col = $this->columns[$i];
            $value = $this->values[$i];
            $valueStrs[] = $isPreparedStatement
                ? $this->buildPreparedValueStr($col, $value)
                : $this->buildValueStr($col, $value);
        }

        return join(", ", $valueStrs);
    }


    private function buildPreparedValueStr(DbCol $col, mixed $value): string
    {
        return match ($col->getType()) {
            DbColType::GEO_POINT => "ST_PointFromText(?)",
            DbColType::GEO_LINE => "ST_LineFromText(?)",
            DbColType::GEO_POLY => "ST_PolyFromText(?)",
            DbColType::GEOMETRY => "ST_GeomFromText(?)",
            default => "?",
        };
    }


    private function buildValueStr(DbCol $col, mixed $value): string
    {
        if ($value === null) {
            return "NULL";
        }

        return match ($col->getType()) {
            DbColType::STRING => DbHelper::getDbStringValue($this->dbService, $value),
            DbColType::INT => DbHelper::getDbIntValue($value),
            DbColType::BOOL => DbHelper::getDbBoolValue($value),
            DbColType::DOUBLE => DbHelper::getDbFloatValue($value),
            DbColType::TIMESTAMP => DbHelper::getDbUtcTimeString($value),
            DbColType::GEO_POINT => DbHelper::getDbPointStringFromPos($value),
            DbColType::GEO_LINE => DbHelper::getDbLineString($value),
            DbColType::GEO_POLY => DbHelper::getDbPolygonString($value),
            default => throw new InvalidArgumentException("Unsupported column type: " . $col->getType()->name),
        };
    }


    private function getBindStatementType(DbColType $type): string
    {
        return match ($type) {
            DbColType::STRING,
            DbColType::TIMESTAMP,
            DbColType::GEO_POINT,
            DbColType::GEO_POLY,
            DbColType::GEOMETRY => "s",
            DbColType::INT,
            DbColType::BOOL => "i",
            DbColType::DOUBLE => "d",
            default => throw new InvalidArgumentException("Unsupported column type: $type->name"),
        };
    }
}
