<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;

interface IDbCondMultiBuilder
{
    function condition(DbCondMulti $cond): IDbCondMultiBuilder;

    function build(): string;
}
