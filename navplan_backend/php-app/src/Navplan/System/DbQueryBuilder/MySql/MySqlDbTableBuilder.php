<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class MySqlDbTableBuilder
{
    public static function buildTableName(DbTable|string $table): string
    {
        return match (true) {
            $table instanceof DbTable => $tableName = $table->getName() . ($table->getAlias() ? " AS " . $table->getAlias() : ""),
            is_string($table) => $tableName = $table,
            default => throw new InvalidArgumentException("Unsupported table type")
        };
    }


    public static function buildTableNameWithoutAlias(DbTable|string $table): string
    {
        return match (true) {
            $table instanceof DbTable => $table->getName(),
            is_string($table) => $table,
            default => throw new InvalidArgumentException("Unsupported table type")
        };
    }
}
