<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;

interface IDbCondInBuilder
{
    function condition(DbCondIn $cond): IDbCondInBuilder;

    function build(): string;
}
