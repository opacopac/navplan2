<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;

interface IDbCondBuilder
{
    function condition(DbCond $cond);

    function build(): string;
}
