<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;


interface IDbCaseBuilder
{
    function when(DbCond $condition, string $thenValue): MySqlDbCaseBuilder;

    function whenEquals(DbCol|string $column, string|int|float|bool|null $value, string $thenValue): MySqlDbCaseBuilder;

    function whenAll(array $conditions, string $thenValue): MySqlDbCaseBuilder;

    function whenAny(array $conditions, string $thenValue): MySqlDbCaseBuilder;

    function else(string $elseValue): MySqlDbCaseBuilder;

    function build(): string;
}
