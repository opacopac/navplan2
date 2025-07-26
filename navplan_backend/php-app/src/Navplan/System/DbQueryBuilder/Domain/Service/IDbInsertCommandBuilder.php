<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

interface IDbInsertCommandBuilder
{
    function insertInto(DbTable $table): IDbInsertCommandBuilder;

    function addCol(DbCol $column, mixed $value = null): IDbInsertCommandBuilder;

    function setColValue(DbCol $column, mixed $value): IDbInsertCommandBuilder;

    function build(bool $isPreparedStatement = false): string;

    function buildBindParamTypes(): string;

    function buildStatement(): IDbStatement;

    function buildAndBindStatement(): IDbStatement;

    function bindStatementValues(): void;
}
