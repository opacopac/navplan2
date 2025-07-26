<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;

class DbRow
{
    public function __construct(public array $row)
    {
    }


    public function getValue(DbCol $column, bool $forceNullable = false, bool $zeroIsNull = false): mixed
    {
        if (!array_key_exists($column->getName(), $this->row)) {
            throw new InvalidArgumentException("Column {$column->getName()} does not exist in the row.");
        }

        $colName = $column->getName();
        return match ($column->getType()) {
            DbColType::BOOL => $column->isNullable() || $forceNullable
                ? StringNumberHelper::parseBoolOrNull($this->row, $column->getName())
                : StringNumberHelper::parseBoolOrError($this->row, $column->getName()),
            DbColType::INT => $column->isNullable() || $forceNullable
                ? StringNumberHelper::parseIntOrNull($this->row, $colName, $zeroIsNull)
                : StringNumberHelper::parseIntOrError($this->row, $colName),
            DbColType::DOUBLE => $column->isNullable() || $forceNullable
                ? StringNumberHelper::parseFloatOrNull($this->row, $colName, $zeroIsNull)
                : StringNumberHelper::parseFloatOrError($this->row, $colName),
            DbColType::STRING => $column->isNullable() || $forceNullable
                ? StringNumberHelper::parseStringOrNull($this->row, $colName)
                : StringNumberHelper::parseStringOrError($this->row, $colName),
            // TODO: timestamp & geo types
            default => throw new InvalidArgumentException("Unsupported column type: {$column->getType()}"),
        };
    }
}
