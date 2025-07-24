<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;

interface IDbInsertCommandBuilder
{
    function insertInto(string $table): IDbInsertCommandBuilder;

    function setValue(DbCol|string $column, string|int|float|bool|null $value): IDbInsertCommandBuilder;

    function build(bool $isPreparedStatement = false): string;

    function buildBindParamTypes(): string;
}
