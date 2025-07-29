<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbExp;

interface IDbExpBuilder
{
    function expression(DbExp $exp): IDbExpBuilder;

    function build(): string;
}
