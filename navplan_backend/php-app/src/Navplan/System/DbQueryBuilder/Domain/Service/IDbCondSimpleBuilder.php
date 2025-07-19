<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;

interface IDbCondSimpleBuilder
{
    function condition(DbCondSimple $cond);

    function build(): string;
}
