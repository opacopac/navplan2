<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class MySqlDbColBuilder
{
    public static function buildAllColName(DbTable|string $table): string
    {
        match (true) {
            $table instanceof DbTable => $allColName = $table->hasAlias()
                ? $table->getAlias() . ".*"
                : "*",
            is_string($table) => $allColName = "*",
            default => throw new InvalidArgumentException("Unsupported table type")
        };

        return $allColName;
    }


    public static function buildColName(DbCol|string $col): string
    {
        match (true) {
            $col instanceof DbCol => $colName = $col->getTable()->hasAlias()
                ? $col->getTable()->getAlias() . "." . $col->getName()
                : $col->getName(),
            is_string($col) => $colName = $col,
            default => throw new InvalidArgumentException("Unsupported column type")
        };

        return $colName;
    }
}
