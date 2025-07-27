<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


interface IDbDeleteCommandBuilder
{
    function deleteFrom(DbTable $table): IDbDeleteCommandBuilder;

    function deleteAllFrom(DbTable $table): IDbDeleteCommandBuilder;

    function where(DbCond $cond): IDbDeleteCommandBuilder;

    function whereEquals(DbCol|string $column, string|int|float|bool|null $value): IDbDeleteCommandBuilder;

    function build(): string;
}
