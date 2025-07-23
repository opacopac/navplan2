<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;

interface IDbInsertCommandBuilder
{
    function insertInto(string $table): IDbInsertCommandBuilder;

    function columns(DBCol ...$columns): IDbInsertCommandBuilder;

    function values(string ...$values): IDbInsertCommandBuilder;

    function build(): string;
}
