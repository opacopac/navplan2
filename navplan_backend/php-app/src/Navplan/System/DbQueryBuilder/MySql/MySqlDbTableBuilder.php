<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class MySqlDbTableBuilder
{
    public static function buildTableName(DbTable|string $table, bool $withAlias = true): string
    {
        return match (true) {
            $table instanceof DbTable => $table->getName() . ($withAlias && $table->getAlias() ? " AS " . $table->getAlias() : ""),
            is_string($table) => $table,
            default => throw new InvalidArgumentException("Unsupported table type")
        };
    }
}
