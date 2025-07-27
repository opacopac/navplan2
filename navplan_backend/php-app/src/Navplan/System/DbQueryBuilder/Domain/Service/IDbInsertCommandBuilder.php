<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

interface IDbInsertCommandBuilder
{
    function insertInto(DbTable $table): IDbInsertCommandBuilder;

    function setColValue(DbCol $column, mixed $value): IDbInsertCommandBuilder;

    function build(bool $isPreparedStatement = false): string;

    function buildBindParamTypes(): string;

    /**
     * Builds the SQL statement and binds the values to the statement.
     * If the statement was already built, the same statement will be returned,
     * only the values will be bound.
     * @return IDbStatement
     */
    function buildAndBindStatement(): IDbStatement;
}
