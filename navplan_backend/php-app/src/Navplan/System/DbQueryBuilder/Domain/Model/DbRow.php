<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;

class DbRow
{
    public function __construct(public array $row)
    {
    }


    public function getValue(DbCol $column): mixed
    {
        if (!array_key_exists($column->getName(), $this->row)) {
            throw new InvalidArgumentException("Column {$column->getName()} does not exist in the row.");
        }

        $colName = $column->getName();
        return match ($column->getType()) {
            DbColType::BOOL => $column->isNullable()
                ? StringNumberHelper::parseBoolOrNull($this->row, $column->getName())
                : StringNumberHelper::parseBoolOrError($this->row, $column->getName()),
            DbColType::INT => $column->isNullable()
                ? StringNumberHelper::parseIntOrNull($this->row, $colName)
                : StringNumberHelper::parseIntOrError($this->row, $colName),
            DbColType::DOUBLE => $column->isNullable()
                ? StringNumberHelper::parseFloatOrNull($this->row, $colName)
                : StringNumberHelper::parseFloatOrError($this->row, $colName),
            DbColType::STRING => $column->isNullable()
                ? StringNumberHelper::parseStringOrNull($this->row, $colName)
                : StringNumberHelper::parseStringOrError($this->row, $colName),
            // TODO: timestamp & geo types
            default => throw new InvalidArgumentException("Unsupported column type: {$column->getType()}"),
        };
    }
}
